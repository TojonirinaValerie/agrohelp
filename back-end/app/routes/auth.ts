import { login, register } from "@/controllers/auth.controller";
import { verifyToken } from "@/middlewares/auth/verify-token";
import { validateRequiredFields } from "@/middlewares/request";
import { checkDuplicateEmail } from "@/middlewares/user/check-duplicate-email";
import { checkUserExist } from "@/middlewares/user/check-user-exist";
import { matchPassword } from "@/middlewares/user/match-passord";
import { Router } from "express";

const router = Router();
/**
 * @author tojo
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     x-author: tojo
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success
 */
router.post(
  "/auth/login",
  [
    validateRequiredFields(["email", "password"]),
    checkUserExist,
    matchPassword,
  ],
  login
);
/**
 * @author tojo
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user
 *     x-author: tojo
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Register success
 */
router.post(
  "/auth/register",
  [validateRequiredFields(["name", "email", "password"]), checkDuplicateEmail],
  register
);
/**
 * @author tojo
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Login user
 *     x-author: tojo
 *     tags:
 *       - Auth
 *     requestAuthorization:
 *       required: true
 *       
 *     responses:
 *       200:
 *         description: Refresh user token
 */
router.post(
  "/auth/refresh-token",
  [verifyToken],
  login
);

export { router as authRouter };
