import { NextFunction, query, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import httpStatusCode from 'http-status-codes';

import catchAsync from '../utils/catchAsync';
import {
  createUserBodyType,
  editUserBodyType,
} from '../validators/user.validators';
import AppError from '../utils/AppError';
import { sendMessage } from '../service/otp.service';
import { multerFile, multerFiledType } from '../utils/Types/multer.types';

const prisma = new PrismaClient();

const createUser = catchAsync(
  async (
    req: Request<undefined, any, createUserBodyType>,
    res: Response,
    next: NextFunction
  ) => {
    const file = req.files as multerFiledType;
    const image = file['documentImage'];
    if (!image || image.length === 0) {
      return next(new AppError('Please provide document image', 400));
    }
    const { phoneNo } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        phoneNo,
      },
    });
    if (user) {
      return next(
        new AppError('Phone Number Alredy Exist', httpStatusCode.BAD_REQUEST)
      );
    }
    const newDocumentImage = await prisma.documentImage.create({
      data: image[0],
    });
    const newUser = await prisma.user.create({
      data: { ...req.body, documentImageId: newDocumentImage.id },
    });
    sendMessage(
      `${newUser.name} Account Created Successfully`,
      newUser.phoneNo
    );

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
    const usercapacity = await prisma.user.findFirst({
      where: {
        id: req.params.id,
      },
      select: {
        RentPaymentSubcriptin: {
          
          select: {
            availability: {
             
              select: {
                uid: true,
                numberOfOccupancies: true,
              },
            },
          },
        },
      },
    });
    // console.log(usercapacity?.RentPaymentSubcriptin[0].availability);
    const ID = usercapacity?.RentPaymentSubcriptin[0].availability.uid;
   const availAbilitycount =   usercapacity.RentPaymentSubcriptin[0].availability.numberOfOccupancies;
    if (usercapacity.RentPaymentSubcriptin[0].availability.numberOfOccupancies >= 0 ) {
       const usercapacity = await prisma.availAbility.update({
         where: {
           uid: ID,
         },
         data: {
           numberOfOccupancies: availAbilitycount+ 1,
          //  isPaymentSuccess: true,
         },
       });
    }
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
      include: {
        DocumentImage: true,
        profile_pic: true,
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
