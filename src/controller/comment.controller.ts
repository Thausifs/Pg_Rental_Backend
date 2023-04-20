import { NextFunction, query, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import httpStatusCode from "http-status-codes";

import catchAsync from "../utils/catchAsync";
import { newCommentType } from "../validators/CommentValidator";

const prisma = new PrismaClient();

const addNewComment = catchAsync(
  async (
    req: Request<{ listingId: string }, any, newCommentType>,
    res: Response,
    next: NextFunction
  ) => {
    const { listingId } = req.params;
    const newComment = await prisma.comment.create({
      data: {
        content: req.body.content,
        residentId: listingId,
        userId: req.user?.id as string,
      },
    });

    res.status(201).json({
      status: true,
      data: newComment,
    });
  }
);

const editCommentById = catchAsync(
  async (
    req: Request<{ listingId: string; commentId: string }, any, newCommentType>,
    res: Response,
    next: NextFunction
  ) => {
    const updatedComment = await prisma.comment.update({
      data: req.body,
      where: {
        id: req.params.commentId,
      },
    });
    res.status(200).json({
      status: true,
      data: updatedComment,
    });
  }
);
const deleteCommentById = catchAsync(
  async (
    req: Request<{ listingId: string; commentId: string }, any>,
    res: Response,
    next: NextFunction
  ) => {
    await prisma.comment.delete({
      where: {
        id: req.params.commentId,
      },
    });
    res.sendStatus(200);
  }
);

const getAllComment = catchAsync(
  async (
    req: Request<{ listingId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { listingId } = req.params;
    const commments = await prisma.comment.findMany({
      where: {
        residentId: listingId,
      },
      include: {
        user: {
          select: {
            name: true,
            profile_pic: true,
          },
        },
      },
    });
    res.status(200).json({
      status: true,
      data: commments,
    });
  }
);

export default {
  addNewComment,
  getAllComment,
  editCommentById,
  deleteCommentById,
};
