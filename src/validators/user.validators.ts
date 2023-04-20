import { type } from "os";
import * as z from "zod";

export const createUserValidators = z.object({
  name: z.string({ required_error: "Name is requird" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is invalid" })
    .optional(),
  phoneNo: z.string(),
  address: z.string(),
  document_type: z.string(),
  document_detail: z.string(),
});
export const editUserValidators = z.object({
  name: z.string({ required_error: "Name is requird" }).optional(),
  address: z.string().optional(),
  document_type: z.string().optional(),
  document_detail: z.string().optional(),
  role: z.enum(["admin", "user"]).optional(),
});

export type editUserBodyType = z.infer<typeof editUserValidators>;

export type createUserBodyType = z.infer<typeof createUserValidators>;
