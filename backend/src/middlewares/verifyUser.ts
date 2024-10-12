import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthRequest extends Request {
    userId: string;
}

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
try{
    const token = req.headers['authorization'];
    if(!token) {
        const error = createHttpError(401, "Unauthorized");
        return next(error);
    }

    const parsedToken = token.split(" ")[1];
    if(!parsedToken) {
        const error = createHttpError(401, "Unauthorized");
        return next(error);
    }

    const decoded = verify(parsedToken, config.jwtSecret as string);
    if(!decoded) {
        const error = createHttpError(401, "Unauthorized");
        return next(error);
    }

    const _req = req as AuthRequest;

    _req.userId = decoded.sub as string;

    next(); 
}catch(err) {
    next(err);
}

}

export default verifyUser;