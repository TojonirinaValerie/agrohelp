import { Response } from "express";
import { ApiResponse } from "@/interfaces/api-response";

class ResponseHandler {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  successRequest = (message?: string, data?: any): Response => {
    return this.sendResponse({
      success: true,
      message: message || "Request with success",
      data: data || null,
      statusCode: 200,
    });
  };

  dataCreated = (message?: string, data?: any): Response => {
    return this.sendResponse({
      success: true,
      message: message || "Data created with success",
      data: data || null,
      statusCode: 201,
    });
  };

  sendResponse({
    success = true,
    message = "",
    data = null,
    statusCode = 200,
  }: ApiResponse<any>) {
    return this.res
      .status(statusCode)
      .json({ success, status: statusCode, message, data });
  }

  badRequest = (message?: string, data?: any): Response => {
    return this.sendResponse({
      success: false,
      message: message || "Bad Request",
      data: data || null,
      statusCode: 400,
    });
  };

  notFound =  (message?: string, data?: any): Response => {
    return this.sendResponse({
      success: false,
      message: message || "Data not found",
      data: data || null,
      statusCode: 404,
    });
  };
}

export default ResponseHandler;
