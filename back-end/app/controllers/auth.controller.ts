import User from "@/models/user";
import IUser from "@/models/user";
import { generateToken } from "@/utils/token";
import type { Response, Request, NextFunction, RequestHandler } from "express";

export const login: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.user as IUser;

    const { accessToken, refreshToken } = generateToken(user);

    res.handler.sendResponse({
      statusCode: 200,
      success: true,
      message: "login success",
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    // now create the user;
    const user = await User.create({
      name,
      email,
      password,
    });

    res.handler.sendResponse({
      success: true,
      statusCode: 201,
      message: " User created Successfully",
      data: {
        user: user.toJSON(),
      },
    });
    return;
  } catch (error: any) {
    next(error);
  }
};
