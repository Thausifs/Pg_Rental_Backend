import multer, { Multer } from "multer";

export const multerUpload = function (destination: string): Multer {
  return multer({
    storage: multer.memoryStorage(),
    dest: destination,
    limits: {
      fileSize: 30 * 1024 * 1024, // no larger than 30mb
    },
  });
};
