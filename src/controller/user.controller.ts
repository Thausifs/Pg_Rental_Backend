import { NextFunction, query, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import httpStatusCode from "http-status-codes";

import catchAsync from "../utils/catchAsync";
import {
  createUserBodyType,
  editUserBodyType,
} from "../validators/user.validators";
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

const editUserDataByUserId = catchAsync(
  async (
    req: Request<{ id: string }, any, editUserBodyType>,
    res: Response,
    next: NextFunction
  ) => {
    const updatedUser = await prisma.user.update({
      data: req.body,
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: true,
      data: updatedUser,
    });
  }
);
const deleteUserDataByUserId = catchAsync(
  async (
    req: Request<{ id: string }, any, editUserBodyType>,
    res: Response,
    next: NextFunction
  ) => {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(200);
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
  editUserDataByUserId,
  deleteUserDataByUserId,
};
