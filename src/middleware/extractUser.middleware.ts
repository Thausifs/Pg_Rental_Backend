import { Request, Response, NextFunction } from "express";
import { decodeJwtToken } from "../service/jwt.service";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { PrismaClient, User } from "@prisma/client";
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
const prisma = new PrismaClient();

const extractUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //*Get Token check it is exist
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);
    }
    //*If Token is not exist
    if (!token) {
      return next(new AppError("You Are Not into Login! Please login", 401));
    }
    const decode = (await decodeJwtToken(token)) as any;
    const user = await prisma.user.findFirst({
      where: {
        phoneNo: decode.number,
      },
    });
    if (!user) {
      return next(new AppError("You Are Not into Login! Please login", 401));
    }
    req.user = user;
    next();
  }
);

export default extractUser;
