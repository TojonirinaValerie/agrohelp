import { Request, Response, NextFunction } from "express";
import ResponseHandler from "@/service/response-handler";
import { cyan, gray, red } from "colorette";

declare global {
  namespace Express {
    interface Response {
      handler: ResponseHandler;
    }
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(red("\n🚨 ERROR DETECTED 🚨"));
  console.error(cyan(`🧠 Reason: ${err.message}`));
  console.error(gray("📄 Trace:\n" + err.stack));
  console.error(red("🛠️  Please check and fix it!\n"));
  res.handler.sendResponse({
    success: false,
    message: err.message || "Internal Server Error",
    data: null,
    statusCode: err.statusCode || 500,
  });
};

export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.handler = new ResponseHandler(res);
  next();
};
