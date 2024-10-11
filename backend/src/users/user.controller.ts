import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { createUserService } from "./user.service";

export const creatUser = async (req : Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    try{
    
    // validation
    if(!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }

    
    const token = await createUserService(req.body);
    // process

    // response

    res.json({
        status: "success",
        message: "User created successfully",
        accessToken : token
    });
}catch(err) {
    next(err);
}
}
