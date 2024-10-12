import cloudinary from "../config/cloudinary";
import path from "node:path";
import { BookFile, Files } from "./bookTypes";



export const uploadCover = async(files: Files) => {

    const coverImageMimeType = files.coverImage[0].mimetype.split("/")[1];
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(__dirname, `../../public/data/uploads`, fileName);
    const uploadResult = await cloudinary.uploader.upload(filePath, {
        filename_override: fileName,
        folder: 'book-covers',
        formate: coverImageMimeType
    });

    console.log("cover image uploaded", uploadResult);

}


export const bookUplaod = async (files : BookFile) => {
    const fileName = files.file[0].filename;
    const filePath = path.resolve(__dirname, `../../public/data/uploads`, fileName);
    const uploadResult = await cloudinary.uploader.upload(filePath, {
        resource_type: "raw",
        filename_override: fileName,
        folder: 'book-pdfs',
        formate: "pdf",
    });

    console.log("file uploaded", uploadResult);
}