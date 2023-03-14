import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

export const validateBody = (schema: AnyZodObject) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      return next(error);
    }
  });
