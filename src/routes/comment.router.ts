import { Router } from "express";
import commentController from "../controller/comment.controller";
import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { validateBody } from "../middleware/validateResource";
import { newCommentValidator } from "../validators/CommentValidator";

const router = Router({ mergeParams: true });

router.get("/", commentController.getAllComment);

router.use(extractUser);

router.post(
  "/",
  validateBody(newCommentValidator),
  commentController.addNewComment
);
router.use(restrictTo(["admin"]));
router.patch(
  "/:commentId",
  validateBody(newCommentValidator),
  commentController.editCommentById
);
router.delete("/:commentId", commentController.deleteCommentById);

export default router;
