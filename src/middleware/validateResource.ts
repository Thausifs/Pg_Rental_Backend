import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validateBody =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      next(error);
    }
  };
export const validateQuery =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = await schema.parseAsync(req.query);
      return next();
      2;
    } catch (error) {
      next(error);
    }
  };
