import mongoose from "mongoose";
import { boolean } from "zod";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  phoneNo: string;
  createdAt: Date;
  updatedAt: Date;
  profile_pic: string;
  address: {
    type: String;
  };
  idProof: {
    documentType: string;
    documentDetail: string;
  };
  role: "user" | "admin";
  isActive: boolean;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
    },
    phoneNo: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    profile_pic: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    idProof: {
      documentType: {
        type: String,
        require: true,
      },
      documentDetail: {
        type: String,
        require: true,
      },
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
