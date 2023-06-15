import { Request, Response, NextFunction } from "express";
import httpStatusCode from "http-status-codes";
import AppError from "../utils/AppError";
const restrictTo = (allowUser: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user?.role);
    
    
    
    if (allowUser.includes(req?.user?.role as string)) {
      
      
      return next();
    }
    next(
      new AppError("You don't have any accesss", httpStatusCode.UNAUTHORIZED)
    );
  };
};

export default restrictTo;
