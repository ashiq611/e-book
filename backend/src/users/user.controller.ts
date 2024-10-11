import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export const creatUser = async (req : Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    
    // validation
    if(!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }

    // process

    // response

    res.json({
        status: "success",
        message: "User created successfully"
    });
}
