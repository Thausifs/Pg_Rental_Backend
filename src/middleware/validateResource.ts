import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import Log from "../utils/logger";
const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } catch (error) {
      Log.error(error);
      return res.status(400).json({
        status: false,
      });
    }
  };
export default validate;
