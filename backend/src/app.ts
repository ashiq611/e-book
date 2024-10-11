import express, { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import globalErrorHandler from './middlewares/globarErrorHandlers';

const app = express();


// routes
app.get('/', (req, res) => {
    const error = createHttpError(500, "Internal server error");
    throw error;
    res.json({
        status: "success",
        message: "Backend is running"
    });
});


// golbal error handler
app.use(globalErrorHandler)






export default app;