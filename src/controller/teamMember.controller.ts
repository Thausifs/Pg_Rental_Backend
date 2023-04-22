import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { multerFiledType } from "../utils/Types/multer.types";
import { NewTeamMemberType } from "../validators/teamMember.validator";

const prisma = new PrismaClient();

const addNewTeamMember = catchAsync(
  async (
    req: Request<any, any, NewTeamMemberType>,
    res: Response,
    next: NextFunction
  ) => {
    const files = req.files as multerFiledType;
    const picture = files["picture"];

    if (!picture || picture?.length === 0) {
      return next(new AppError("Profile Pic is Required", 400));
    }

    const teamMemberPicture = await prisma.teamMemberImage.create({
      data: picture[0],
    });

    const newTeamMember = await prisma.teamMember.create({
      data: {
        ...req.body,
        teamMemberImageId: teamMemberPicture.id,
      },
    });
    res.status(201).json({
      status: true,
      data: newTeamMember,
    });
  }
);

const getAllTeamMember = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getAllTeamMember = await prisma.teamMember.findMany({
      include: {
        pic: true,
      },
    });
    res.status(200).json({
      data: getAllTeamMember,
    });
  }
);
const deleteTeamMemberById = catchAsync(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    await prisma.teamMember.delete({
      where: {
        id: req.params.id,
      },
      include: {
        pic: true,
      },
    });
    res.sendStatus(200);
  }
);

export default {
  addNewTeamMember,
  getAllTeamMember,
  deleteTeamMemberById,
};
