import { NextFunction, query, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import httpStatusCode from "http-status-codes";

import catchAsync from "../utils/catchAsync";
import { newCommentType } from "../validators/CommentValidator";
import { newComplainType } from "../validators/complain.validator";
import AppError from "../utils/AppError";

const prisma = new PrismaClient();

const addNewComplain = catchAsync(
  async (
    req: Request<any, any, newComplainType>,
    res: Response,
    next: NextFunction
  ) => {
    const newComplain = await prisma.complain.create({
      data: {
        message: req.body.message,
        userId: req.user?.id as string,
      },
    });

    res.status(201).json({
      status: true,
      data: newComplain,
    });
  }
);

const editComplainById = catchAsync(
  async (
    req: Request<{ id: string }, any, newComplainType>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const complain = await prisma.complain.findFirst({
      where: {
        id,
      },
    });
    if (complain?.userId !== req?.user?.id && req?.user?.role !== "admin") {
      return next(new AppError("You don't have permision", 400));
    }
    await prisma.complain.update({
      where: {
        id,
      },
      data: req.body,
    });

    res.sendStatus(201);
  }
);
const deleteComplainById = catchAsync(
  async (
    req: Request<{ id: string }, any>,
    res: Response,
    next: NextFunction
  ) => {
    await prisma.complain.delete({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(200);
  }
);

const getAllCompain = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let complains;
    if (req?.user?.role === "admin") {
      complains = await prisma.complain.findMany({
        include: {
          user: {
            select: {
              name: true,
              phoneNo: true,
            },
          },
        },
      });
    } else {
      complains = await prisma.complain.findMany({
        where: {
          userId: req.user?.id,
        },
        include: {
          user: {
            select: {
              name: true,
              phoneNo: true,
            },
          },
        },
      });
    }
    res.status(200).json({
      status: true,
      data: complains,
    });
  }
);

export default {
  addNewComplain,
  getAllCompain,
  editComplainById,
  deleteComplainById,
};
