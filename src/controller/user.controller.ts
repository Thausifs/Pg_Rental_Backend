import { NextFunction, query, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import httpStatusCode from "http-status-codes";

import catchAsync from "../utils/catchAsync";
import { createUserBodyType } from "../validators/user.validators";
import AppError from "../utils/AppError";

const prisma = new PrismaClient();

const createUser = catchAsync(
  async (
    req: Request<undefined, any, createUserBodyType>,
    res: Response,
    next: NextFunction
  ) => {
    const { phoneNo } = req.body;
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
    res.status(201).json({
      status: true,
      data: newUser,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: req?.user?.id,
        },
      },
    });
    res.status(200).json({
      status: true,
      data: users,
    });
  }
);

export default {
  createUser,
  getAllUsers,
};
