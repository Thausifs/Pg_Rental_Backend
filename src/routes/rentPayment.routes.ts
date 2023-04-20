import { Router } from "express";
import commentController from "../controller/comment.controller";
import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { validateBody } from "../middleware/validateResource";
import { newCommentValidator } from "../validators/CommentValidator";
import {
  addNewRentPayment,
  payemntSuccessForSubcriptionBody,
} from "../validators/rentPaymentValidator";
import rentPaymetController from "../controller/rentPaymet.controller";

const router = Router({ mergeParams: true });

router.use(extractUser);

router.get("/", rentPaymetController.getAllRentPayment);

router.patch(
  "/:id",
  validateBody(payemntSuccessForSubcriptionBody),
  rentPaymetController.editRentPaymentById
);

router.use(restrictTo(["admin"]));

router.post(
  "/",
  validateBody(addNewRentPayment),
  rentPaymetController.addNewRentPayment
);

router.delete("/:commentId", commentController.deleteCommentById);

export default router;
