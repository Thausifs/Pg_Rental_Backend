import { Request, Response, NextFunction } from "express";

import catchAsync from "../utils/catchAsync";

const addFeature = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file);
    res.sendStatus(201);
  }
);

export default {
  addFeature,
};
