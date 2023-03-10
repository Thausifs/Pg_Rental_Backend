import mongoose from "mongoose";

interface otpDocument extends mongoose.Document {
  phoneNo: string;
  otp: string;
  isValid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const otpSchema = new mongoose.Schema<otpDocument>(
  {
    phoneNo: {
      type: String,
      require: true,
      length: 10,
    },
    otp: {
      type: String,
      require: true,
    },
    isValid: {
      type: Boolean,

      default: true,
      index: {
        expires: 300,
      },
    },
  },
  {
    timestamps: true,
  }
);

const otpModel = mongoose.model<otpDocument>("otp", otpSchema);

export default otpModel;
