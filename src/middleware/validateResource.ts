import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validateBody =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      return next(error);
    }
  };
