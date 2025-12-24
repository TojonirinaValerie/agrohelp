import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "@/routes";
import { errorHandler, responseHandler } from "@/middlewares/response";
import { requestLogger } from "@/middlewares/request";
import { setupSwagger } from "./swagger";
import path from "path";

// Creation serveur
const app: Application = express();

// Configuration serveur
app.use(bodyParser.json());
app.use(cors({
  origin: ['https://agrohelp-consulting.onrender.com', 'https://agrohelp-consulting-dashboard.onrender.com', 'http://localhost:4200', 'http://localhost:5173'], // or use '*' for all origins (not recommended in prod)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  //credentials: true
}));
app.use(requestLogger);
app.use(responseHandler);

// Routes
app.use('/uploads', express.static(path.join(__dirname, '../uploads/products')));
//app.use('/download-invoice', express.static(path.join(__dirname, '../invoices')));
app.use("/api", routes);
setupSwagger(app);
// Middleware de gestion des erreurs
app.use(errorHandler);
export default app;
