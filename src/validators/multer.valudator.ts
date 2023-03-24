import z from "zod";

const multerObjectValidator = z.array(
  z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string(),
    destination: z.string(),
    filename: z.string(),
    path: z.string(),
    size: z.number(),
  })
);

export default multerObjectValidator;
