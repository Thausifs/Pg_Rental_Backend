import { Router } from "express";
import userController from "../controller/user.controller";
import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { validateBody } from "../middleware/validateResource";
import {
  createUserValidators,
  editUserValidators,
} from "../validators/user.validators";

const router = Router();

router.use(extractUser, restrictTo(["admin"]));

router.post("/", validateBody(createUserValidators), userController.createUser);
router.get("/", userController.getAllUsers);
router.patch(
  "/:id",
  validateBody(editUserValidators),
  userController.editUserDataByUserId
);
router.delete("/:id", userController.deleteUserDataByUserId);

export default router;
