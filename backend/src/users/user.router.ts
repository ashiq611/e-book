import express from "express";
import { creatUser, loginUser } from "./user.controller";


const userRouter = express.Router();


userRouter.post("/register", creatUser);

userRouter.post("/login", loginUser);






export default userRouter;