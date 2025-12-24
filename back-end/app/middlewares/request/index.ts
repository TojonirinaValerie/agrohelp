// middlewares/requestLogger.ts
import type { Request, Response, NextFunction } from "express";
import { red, green, yellow, blue, cyan, magenta, reset } from "colorette";
import { ValidationSchema } from "@/interfaces/request";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const method = req.method;
  const url = req.path;
  const query = req.query;
  const body = req.body;

  console.log("\n🛰️  =========================================");
  console.log(cyan("📡 Incoming Request"));
  console.log(`${yellow("🔸 Method     :")} ${blue(method)}`);
  console.log(`${yellow("🔹 Endpoint   :")} ${blue(url)}`);

  if (query && Object.keys(req.query).length > 0) {
    const cleanQuery = Object.assign({}, req.query);
    console.log(`${green("🔍 Query Params :")}`);
    console.log(cyan(JSON.stringify(cleanQuery, null, 2)));
  }

  if (body && Object.keys(req.body).length > 0) {
    console.log(`${green("📦 Request Body :")}`);
    console.log(cyan(JSON.stringify(body, null, 2)));
  }

  console.log("=============================================\n");

  next();
};

export const validateRequiredFields = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    // Si body n'existe, afficher l'erreur que requiredFields est required
    if (!body) {
      res.handler.badRequest(
        `Missing required fields: ${requiredFields.join(", ")}`
      );
      return;
    }
    
    // Vérifie si tous les champs requis sont présents dans le body
    const missingFields = requiredFields.filter((field) => !(field in body));

    if (missingFields.length > 0) {
      res.handler.badRequest(
        `Missing required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    next();
  };
};
