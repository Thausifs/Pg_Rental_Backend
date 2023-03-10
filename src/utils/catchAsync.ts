//*This is an wrapper function to catch error from asynccronus function
import { Request, Response, NextFunction } from "express";

const catchAsync = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
