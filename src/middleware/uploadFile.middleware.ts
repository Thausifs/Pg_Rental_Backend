import multer, { Multer } from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(__dirname);
    cb(null, `${__dirname}/../../public/img`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const multerUpload = function (destination: string): Multer {
  return multer({
    storage: storage,
    limits: {
      fileSize: 30 * 1024 * 1024, // no larger than 30mb
    },
  });
};
