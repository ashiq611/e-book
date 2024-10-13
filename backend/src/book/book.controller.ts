import { NextFunction, Request, Response } from "express";
import {  bookUplaod,createBookService,updateBookService,uploadCover } from "./book.service";
import { BookFile, Files } from "./bookTypes";
import fs from 'fs';
import userModel from "../users/user.model";
import createHttpError from "http-errors";
import { AuthRequest } from "../middlewares/verifyUser";
import bookModel from "./book.model";
import cloudinary from "../config/cloudinary";
import path from "node:path";

export const createBook = async (req: Request,
    res: Response,
    next: NextFunction): Promise<void> => {
        const { title, genre } = req.body;

        try{
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const coverFiles: Files = { coverImage: files['coverImage'] };
            const bookFiles: BookFile = { file: files['file'] };
            const {filePath: cover_path, uploadResult: cover_url} = await uploadCover(coverFiles);
            const {filePath: book_path, uploadResult: book_url} = await bookUplaod(bookFiles);

            const _req = req as AuthRequest
            const user = await userModel.findById(_req.userId);

            if (!user) {
               throw createHttpError(404, "User not found");
            }

            const newBook = await createBookService({
                title,
                author: user,
                genre,
                coverImage: cover_url.secure_url,
                file: book_url.secure_url,
            })

            // delete temp file
            await fs.promises.unlink(cover_path);
            await fs.promises.unlink(book_path);

            res.status(201).json({
                status: "success",
                message: "Book created successfully",
                bookID: newBook
            });
        }catch(err){
            next(err);
        }
}


export const updateBook = async (req: Request,
    res: Response,
    next: NextFunction): Promise<void> => {
        const { title, genre } = req.body;
        const bookId = req.params.bookId;
        try{
            const book = await bookModel.findOne({ _id: bookId });
            if (!book) {
                throw createHttpError(404, "Book not found");
            }
            
            const _req = req as AuthRequest
            if(book.author._id.toString() !== _req.userId) {
                throw createHttpError(401, "Unauthorized");
            }

            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            let completedCoverImage = "";
            if(files['coverImage']) {
                const filename = files['coverImage'][0].filename;
                const coverMimeType = files['coverImage'][0].mimetype.split("/")[1];
                const filePath = path.resolve(__dirname, `../../public/data/uploads`, filename);
                completedCoverImage = filename;
                const uploadResult = await cloudinary.uploader.upload(filePath, {
                    filename_override: completedCoverImage,
                    folder: 'book-covers',
                    format: coverMimeType
                });
                completedCoverImage = uploadResult.secure_url;
                await fs.promises.unlink(filePath);
            }
            
            let completeFileName = "";
            if(files['file']) {
                const bookFilePath = path.resolve(__dirname, `../../public/data/uploads`, files['file'][0].filename);
                const bookFileName = files['file'][0].filename;
                completeFileName = bookFileName;
                const uploadResult = await cloudinary.uploader.upload(bookFilePath, {
                    resource_type: "raw",
                    filename_override: completeFileName,
                    folder: 'book-pdfs',
                    format: "pdf",
                });
                completeFileName = uploadResult.secure_url;
                await fs.promises.unlink(bookFilePath);
            }

            const updateBook = await updateBookService(bookId, {
                title,
                genre,
                coverImage: completedCoverImage ? completedCoverImage : book.coverImage,
                file: completeFileName ? completeFileName : book.file
            });
            res.status(200).json({
                status: "success",
                message: "Book updated successfully",
                book: updateBook
            });


        }catch(err){
            next(err);
        }
}


export const listBooks = async (req: Request,
    res: Response,
    next: NextFunction): Promise<void> => {
        try{
            const books = await bookModel.find();
            res.status(200).json({
                status: "success",
                message: "Books fetched successfully",
                books,
            });
        
            }catch(err){
                next(err);
            }
}


export const singleBookById = async (req: Request,
    res: Response,
    next: NextFunction): Promise<void> => {
        const bookId = req.params.bookId;
        try{
            const book = await bookModel.findOne({ _id: bookId });
            if (!book) {
                throw createHttpError(404, "Book not found");
            }
            res.status(200).json({
                status: "success",
                message: "Book fetched successfully",
                book    
            });

        }catch(err){
            next(err);
        }

    }


    export const deleteBook = async (req: Request,
        res: Response,
        next: NextFunction): Promise<void> => {
            const bookId = req.params.bookId;
            try{
                const book = await bookModel.findOne({ _id: bookId });
                if (!book) {
                    throw createHttpError(404, "Book not found");
                }
                const _req = req as AuthRequest
                if(book.author._id.toString() !== _req.userId) {
                    throw createHttpError(401, "Unauthorized");
                }
                const coverFileSplit = book.coverImage.split("/");
                const coverImagePublicId = coverFileSplit.at(-2) + "/" + coverFileSplit.at(-1)?.split(".").at(-2);
                await cloudinary.uploader.destroy(coverImagePublicId);
                const bookFileSplit = book.file.split("/");
                const bookFilePublicId = bookFileSplit.at(-2) + "/" + bookFileSplit.at(-1)
                await cloudinary.uploader.destroy(bookFilePublicId, {
                    resource_type: "raw",
                });
                await bookModel.deleteOne({ _id: bookId });
                res.status(204).json({
                    status: "success",
                    message: "Book deleted successfully",
                    deletedBookID: bookId
                });
        
            }catch(err){
                next(err);
            
        }}