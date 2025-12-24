import type { Response, Request, NextFunction, RequestHandler } from "express";
import bcrypt from "bcrypt";
import User from "@/models/user";

export const matchPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body.userInstance as InstanceType<typeof User>;
    const { password } = req.body;

    const test = bcrypt.compareSync(password, user.password);
    if (!test) {
      res.handler.sendResponse({
        statusCode: 400,
        success: false,
        message: "Email ou mot de passe incorrect",
        data: undefined,
      });
      return;
    }
    req.body.user = user.toJSON();
    next();
  } catch (error: any) {
    next(error);
  }
};
