import { Router } from "express";
import complainController from "../controller/complain.controller";
import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { validateBody } from "../middleware/validateResource";
import { newComplainValidator } from "../validators/complain.validator";

const router = Router({ mergeParams: true });

router.use(extractUser);

router.get("/", complainController.getAllCompain);

router.post(
  "/",
  validateBody(newComplainValidator),
  complainController.addNewComplain
);
router.patch(
  "/:id",
  validateBody(newComplainValidator),
  complainController.editComplainById
);
router.use(restrictTo(["admin"]));

router.delete("/:id", complainController.deleteComplainById);

export default router;
