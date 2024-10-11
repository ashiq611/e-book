import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { createUserService, loginUserService } from "./user.service";

export const creatUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  try {
    // validation
    if (!name || !email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    const token = await createUserService(req.body);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    const token = await loginUserService(req.body);

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
};
