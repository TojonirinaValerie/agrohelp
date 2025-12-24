import User from "@/models/user";
import type { Response, Request, NextFunction, RequestHandler } from "express";
export const checkUserExist: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      res.handler.sendResponse({
        statusCode: 404,
        success: false,
        message: "User not found",
        data: undefined,
      });
      return;
    }

    req.body.userInstance = user as InstanceType<typeof User>;
    next();
  } catch (error: any) {
    next(error);
  }
};
