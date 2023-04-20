import * as z from "zod";

export const newCommentValidator = z.object({
  content: z.string(),
});

export type newCommentType = z.infer<typeof newCommentValidator>;
