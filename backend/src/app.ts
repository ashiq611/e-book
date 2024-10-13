import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import createHttpError from 'http-errors';
import globalErrorHandler from './middlewares/globarErrorHandlers';
import userRouter from './users/user.router';
import bookRouter from './book/book.router';
import { config } from './config/config';

const app = express();

app.use(helmet());
app.use(cors(
    {
        origin: config.frontendUrl,
        // credentials: true
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.get('/', (req, res) => {
    // const error = createHttpError(500, "Internal server error");
    // throw error;
    res.json({
        status: "success",
        message: "Backend is running"
    });
});

app.use('/api/v1/users',userRouter);
app.use('/api/v1/books',bookRouter);


// golbal error handler
app.use(globalErrorHandler)






export default app;