import { NextFunction, Router, Request, Response } from "express";
import multer from "multer";
import {
  loginController,
  SignUpHandler,
  userDetailController,
  varifyOtpHandlerForLogin,
  varifyOtpHandlerForResgistration,
} from "../controller/auth.controller";
import extractUser from "../middleware/extractUser.middleware";
import { multerUpload } from "../middleware/uploadFile.middleware";
import Log from "../utils/logger";

const authRouter = Router();

authRouter.post("/signup", SignUpHandler);
authRouter.post("/login", loginController);

authRouter.post("/verifyOtpForRegistration", varifyOtpHandlerForResgistration);
authRouter.post("/verifyOtpForLogin", varifyOtpHandlerForLogin);
authRouter.get("/me", extractUser, userDetailController);
export default authRouter;
