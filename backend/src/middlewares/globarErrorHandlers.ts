import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { config } from "../config/config";



const globalErrorHandler = (err: HttpError, req: Request, res : Response, next : NextFunction) => {
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message,
        errorStake: config.env === "development" ? err.stack : "",
    });
}


export default globalErrorHandler;