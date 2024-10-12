import { NextFunction, Request, Response } from "express";
import {  bookUplaod,uploadCover } from "./book.service";
import { BookFile, Files } from "./bookTypes";

export const createBook = async (req: Request,
    res: Response,
    next: NextFunction) => {
        // const { title, author } = req.body;

        try{
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const coverFiles: Files = { coverImage: files['coverImage'] };
            const bookFiles: BookFile = { file: files['file'] };
            await uploadCover(coverFiles);
            await bookUplaod(bookFiles);

            

            res.status(201).json({
                status: "success",
                message: "Book created successfully",
            });
        }catch(err){
            next(err);
        }
}