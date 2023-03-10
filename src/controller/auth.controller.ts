import { Request, Response, NextFunction } from "express";
import httpStatusCode from "http-status-codes";
import { number } from "zod";
import otpModel from "../models/otpModel";
import User from "../models/user.model";
import { generateToken } from "../service/jwt.service";
import {
  checkOtpIsCorrectNess,
  encryptTheOtp,
  otpGenerator,
  sendOtp,
} from "../service/otp.service";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import Log from "../utils/logger";

export const SignUpHandler = catchAsync(
  async (
    req: Request<undefined, any, { number: string; name: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //*Check weather number is exist or not in database
      const { number, name } = req.body;
      const user = await User.findOne({ phoneNo: number });
      if (user) {
        return next(
          new AppError("Phone Number Alredy Exist", httpStatusCode.BAD_REQUEST)
        );
      }
      const newUser = User.create({
        phoneNo: number,
        name,
      });
      const otp = otpGenerator();
      const encrytedOtp = await encryptTheOtp(otp);
      const newOtp = await otpModel.create({
        otp: encrytedOtp,
        phoneNumber: number,
      });
      // await sendOtp(otp, number);

      res.status(201).json({
        status: true,
        message: "Otp Send Successfully",
      });
    } catch (error) {
      Log.error(error);
      return res.status(409);
    }
  }
);

export const varifyOtpHandlerForResgistration = catchAsync(
  async (
    req: Request<
      any,
      any,
      {
        number: string;
        otp: string;
      }
    >,
    res: Response,
    next: NextFunction
  ) => {
    const { number, otp } = req.body;
    const getOtpModelInstance = await otpModel
      .findOne({ phoneNumber: number })
      .sort("-createdAt");
    Log.info(req.body);

    if (!getOtpModelInstance) {
      return next(new AppError("Otp is incorrect", httpStatusCode.BAD_REQUEST));
    }
    const correcnesOfOtp = await checkOtpIsCorrectNess(
      otp,
      getOtpModelInstance.otp
    );
    if (correcnesOfOtp) {
      const user = await User.findOneAndUpdate(
        { phoneNo: number },
        {
          isActive: true,
        },
        {
          new: true,
        }
      );

      await otpModel.deleteMany({ phoneNumber: number });
      return res.status(200).json({
        status: true,
        error: "Otp is correct",
        user,
        token: generateToken({
          userId: user?._id,
          number,
        }),
      });
    } else {
      return next(new AppError("Otp is incorrect", httpStatusCode.BAD_REQUEST));
    }
  }
);

export const loginController = catchAsync(
  async (
    req: Request<any, any, { number: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { number } = req.body;
    const user = await User.findOne({ phoneNo: number });
    if (!user) {
      return next(
        new AppError("User Does Not Exist", httpStatusCode.NOT_FOUND)
      );
    }
    const otp = otpGenerator();
    const encrytedOtp = await encryptTheOtp(otp);
    const newOtp = await otpModel.create({
      otp: encrytedOtp,
      phoneNumber: number,
    });
    Log.info(otp);
    // await sendOtp(otp, number);
    res.status(httpStatusCode.OK).json({
      status: true,
      message: "Otp Send Successfully!",
    });
  }
);
export const varifyOtpHandlerForLogin = catchAsync(
  async (
    req: Request<any, any, { number: string; otp: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { number, otp } = req.body;
    const getOtpModelInstance = await otpModel
      .findOne({ phoneNumber: number })
      .sort("-createdAt");
    Log.info(req.body);

    if (!getOtpModelInstance) {
      return next(new AppError("Otp is incorrect", httpStatusCode.BAD_REQUEST));
    }
    const correcnesOfOtp = await checkOtpIsCorrectNess(
      otp,
      getOtpModelInstance.otp
    );
    if (correcnesOfOtp) {
      const user = await User.findOne({ phoneNo: number });

      await otpModel.deleteMany({ phoneNumber: number });
      return res.status(200).json({
        status: true,
        error: "Otp is correct",
        user,
        token: generateToken({
          userId: user?._id,
          number,
        }),
      });
    } else {
      return next(new AppError("Otp is incorrect", httpStatusCode.BAD_REQUEST));
    }
  }
);

export const userDetailController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(httpStatusCode.OK).json({
      status: true,
      user: req?.user,
      token: generateToken({
        userId: req.user?._id,
        number: req.user?.phoneNo as string,
      }),
    });
  }
);
