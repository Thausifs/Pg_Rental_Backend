import * as z from "zod";

export const newComplainValidator = z.object({
  message: z.string(),
  state: z.enum(["CREATED", "RESOLVED"]).optional(),
  ComplainCatagory: z.enum(["ELECTRICAL", "PLUMBING", "SNITARY"]),
});

export type newComplainType = z.infer<typeof newComplainValidator>;
