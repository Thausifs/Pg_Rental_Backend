import { Router } from "express";
import teamMemberController from "../controller/teamMember.controller";
import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { imageUpload } from "../middleware/uploadFile.middleware";
import { validateBody } from "../middleware/validateResource";
import { NewTeamMemberValidator } from "../validators/teamMember.validator";

const router = Router({ mergeParams: true });

router.get("/", teamMemberController.getAllTeamMember);

router.use(extractUser);
router.use(restrictTo(["admin"]));

router.post(
  "/",
  imageUpload().fields([{ name: "picture", maxCount: 1 }]),
  validateBody(NewTeamMemberValidator),
  teamMemberController.addNewTeamMember
);

router.delete("/:id", teamMemberController.deleteTeamMemberById);

export default router;
