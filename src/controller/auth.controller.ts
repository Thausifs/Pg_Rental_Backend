import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import httpStatusCode from "http-status-codes";
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
import { createUserBodyType } from "../validators/user.validators";

const prisma = new PrismaClient();

export const SignUpHandler = catchAsync(
  async (
    req: Request<undefined, any, createUserBodyType>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //*Check weather number is exist or not in database
      const { phoneNo, name } = req.body;

      const user = await prisma.user.findFirst({
        where: {
          phoneNo,
        },
      });
      if (user) {
        return next(
          new AppError("Phone Number Alredy Exist", httpStatusCode.BAD_REQUEST)
        );
      }
      const newUser = await prisma.user.create({ data: req.body });
      const otp = otpGenerator();
      const encrytedOtp = await encryptTheOtp(otp);

      const newOtp = await prisma.otp.create({
        data: {
          otp: encrytedOtp,
          userId: newUser.id,
          isValid: true,
        },
      });
      // sendOtp(otp, phoneNo);
      Log.info(otp);

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

    const getOtpModelInstance = await prisma.otp.findFirst({
      where: {
        user: {
          phoneNo: number,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    if (!getOtpModelInstance) {
      return next(new AppError("Otp is incorrect", httpStatusCode.BAD_REQUEST));
    }
    const correcnesOfOtp = await checkOtpIsCorrectNess(
      otp,
      getOtpModelInstance.otp
    );
    if (correcnesOfOtp) {
      await prisma.otp.deleteMany({
        where: {
          user: {
            phoneNo: number,
          },
        },
      });
      const user = await prisma.user.findFirst({
        where: {
          phoneNo: number,
        },
      });
      return res.status(200).json({
        status: true,
        message: "Otp is correct",
        user,
        token: generateToken({
          userId: user?.id as string,
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
    const user = await prisma.user.findFirst({
      where: {
        phoneNo: number,
      },
    });
    if (!user) {
      return next(
        new AppError("User Does Not Exist", httpStatusCode.NOT_FOUND)
      );
    }
    const otp = otpGenerator();
    const encrytedOtp = await encryptTheOtp(otp);
    // sendOtp(otp, number);

    await prisma.otp.create({
      data: {
        otp: encrytedOtp,
        isValid: true,
        userId: user.id,
      },
    });
    Log.info(otp);
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

    const getOtpModelInstance = await prisma.otp.findFirst({
      where: {
        user: {
          phoneNo: number,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    if (!getOtpModelInstance) {
      return next(new AppError("Otp is incorrect", httpStatusCode.BAD_REQUEST));
    }
    const correcnesOfOtp = await checkOtpIsCorrectNess(
      otp,
      getOtpModelInstance.otp
    );
    if (correcnesOfOtp) {
      await prisma.otp.deleteMany({
        where: {
          user: {
            phoneNo: number,
          },
        },
      });
      const user = await prisma.user.findFirst({
        where: {
          phoneNo: number,
        },
      });
      if (!user) {
        return next(new AppError("User Does not Exisg", 400));
      }

      return res.status(200).json({
        status: true,
        message: "Otp is correct",
        user,
        token: generateToken({
          userId: user.id,
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
        userId: req.user?.id as string,
        number: req.user?.phoneNo as string,
      }),
    });
  }
);
