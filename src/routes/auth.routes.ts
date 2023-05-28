import { NextFunction, Router, Request, Response } from "express";
import {
  loginController,
  SignUpHandler,
  userDetailController,
  varifyOtpHandlerForLogin,
  varifyOtpHandlerForResgistration,
  chnageProfilePicController,
} from "../controller/auth.controller";
import extractUser from "../middleware/extractUser.middleware";
import { imageUpload } from "../middleware/uploadFile.middleware";
import { validateBody } from "../middleware/validateResource";
import { createUserValidators } from "../validators/user.validators";

const authRouter = Router();

authRouter.post("/signup", validateBody(createUserValidators), SignUpHandler);
authRouter.post("/login", loginController);

authRouter.post("/verifyOtpForRegistration", varifyOtpHandlerForResgistration);
authRouter.post("/verifyOtpForLogin", varifyOtpHandlerForLogin);
authRouter.get("/me", extractUser, userDetailController);
authRouter.post(
  "/me/profilePic",
  extractUser,
  imageUpload().fields([{ name: "profilePic", maxCount: 1 }]),
  chnageProfilePicController
);

export default authRouter;
