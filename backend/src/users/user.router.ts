import express from "express";
import { creatUser } from "./user.controller";


const userRouter = express.Router();


userRouter.post("/register", creatUser);






export default userRouter;