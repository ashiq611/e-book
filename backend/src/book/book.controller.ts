import { NextFunction, Request, Response } from "express";
import {  bookUplaod,createBookService,uploadCover } from "./book.service";
import { BookFile, Files } from "./bookTypes";
import fs from 'fs';
import userModel from "../users/user.model";
import createHttpError from "http-errors";
import { AuthRequest } from "../middlewares/verifyUser";

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