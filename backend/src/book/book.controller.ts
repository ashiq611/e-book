import { NextFunction, Request, Response } from "express";

export const createBook = async (req: Request,
    res: Response,
    next: NextFunction) => {
        const { title, author } = req.body;

        try{

        }catch(err){
            next(err);
        }
}