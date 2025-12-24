import { Router } from "express";
import { authRouter } from "./auth";
import { protectedRoute } from "./protected-route";
import { verifyToken } from "@/middlewares/auth/verify-token";
import { publicRoute } from "./public-route";

const router = Router();

router.use("/", authRouter);
router.use("/", publicRoute);
router.use("/", [verifyToken], protectedRoute);

export default router;
