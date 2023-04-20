import * as z from "zod";

export const newComplainValidator = z.object({
  message: z.string(),
  state: z.enum(["CREATED", "RESOLVED"]).optional(),
});

export type newComplainType = z.infer<typeof newComplainValidator>;
