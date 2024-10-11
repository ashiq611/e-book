import createHttpError from "http-errors";
import userModel from "./user.model";
import { User } from "./userTypes";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

export const createUserService = async (body: User) => {
    const { name, email, password } = body;

    const user = await userModel.findOne({ email });
    if(user) {
        throw createHttpError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await userModel.create({
        name,
        email,
        password: hashedPassword
    });

    // token generate and send to user
    const token = sign({sub: data._id}, config.jwtSecret as string, {
        expiresIn: "7d"
    })

    return token;
    
}