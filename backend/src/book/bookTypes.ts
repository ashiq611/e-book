import { User } from "../users/userTypes";

export interface Book {
    _id: string;
    title: string;
    author: User;
    genre: string;
    coverImage: string;
    file: string;
    createAt: Date;
    updateAt: Date;

}

interface File {
    mimetype: string;
    filename: string;
}

export interface Files {
    coverImage: File[];
}

export interface BookFile {
    file: File[];
}
