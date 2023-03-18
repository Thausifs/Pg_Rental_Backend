import { Router } from "express";
import catagoryController from "../controller/roomType.controller";
import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { validateBody } from "../middleware/validateResource";
import { addCatagoryValidator } from "../validators/catagory.validator";

const router = Router({ mergeParams: true });

router.get("/", catagoryController.getAllCatagory);

router.use(extractUser, restrictTo(["admin"]));

router.post(
  "/",
  validateBody(addCatagoryValidator),
  catagoryController.addCatagory
);

export default router;
