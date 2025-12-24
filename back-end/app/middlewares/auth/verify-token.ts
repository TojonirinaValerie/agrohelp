import User from "@/models/user";
import { verifyValidityToken } from "@/utils/token";
import type { Response, Request, NextFunction, RequestHandler } from "express";

export const verifyToken: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authorization = req.headers.authorization;
  if (!authorization) {
    res.handler.sendResponse({
      statusCode: 400,
      success: false,
      message: "No Token",
      data: undefined,
    });
    return;
  }

  try {
    let token = authorization.split(" ")[1];
    verifyValidityToken(token, (err, decoded: any) => {
      if (err) {
        res.handler.sendResponse({
          statusCode: 401,
          success: false,
          message: "Unauthorized",
          data: undefined,
        });
        return;
      }

      const user = decoded;
      delete user.iat;
      delete user.exp;
      
      if (!req.body) {
        req.body = { user };
      } else {
        req.body.user = user as InstanceType<typeof User>;
      }
      next();
    });
  } catch (e) {
    next(e);
  }
};
