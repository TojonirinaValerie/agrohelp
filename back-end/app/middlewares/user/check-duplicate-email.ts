import User from "@/models/user";
import type { Response, Request, NextFunction, RequestHandler } from "express";

export const checkDuplicateEmail: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    // ** Check the email all ready exist in database or not ;
    const isEmailAllReadyExist = await User.findOne({
      where: { email: email },
    });

    // ** Add a condition if the user exist we will send the response as email all ready exist
    if (isEmailAllReadyExist) {
      res.handler.badRequest("Email already in use");
      return;
    }

    next();
  } catch (error: any) {
    next(error);
  }
};
