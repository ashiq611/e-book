import express from "express";
import { createBook, listBooks, updateBook } from "./book.controller";
import path from "node:path";
import multer from "multer";
import verifyUser from "../middlewares/verifyUser";



const bookRouter = express.Router();


const upload = multer({
    dest: path.join(__dirname, "../../public/data/uploads"),
    limits: { fileSize: 3e7} // 3mb
})

bookRouter.post("/",verifyUser,upload.fields(
    [
        {name: "coverImage", maxCount: 1},
        {name: "file", maxCount: 1}
    ]
) ,createBook);


bookRouter.patch("/:bookId",verifyUser,upload.fields(
    [
        {name: "coverImage", maxCount: 1},
        {name: "file", maxCount: 1}
    ]
), updateBook )


bookRouter.get("/",listBooks)






export default bookRouter;