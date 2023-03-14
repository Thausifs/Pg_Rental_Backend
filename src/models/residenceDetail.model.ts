import mongoose from "mongoose";
import { number } from "zod";

const residentDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  seoTitle: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  occupanycies: [
    {
      roomType: {
        type: String,
        required: true,
      },
      price: {
        type: number,
        require: true,
      },
      numberOfOccupancies: {
        type: Number,
        require: true,
      },
    },
  ],
  feature: [
    {
      feature_name: {
        type: String,
      },
      feature_icon: {
        type: String,
      },
    },
  ],
  roomPhotos: [{ type: String, require: true }],
  dinningAreaPhotos: [{ type: String, require: true }],
  commonAreaPhotos: [{ type: String, require: true }],
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
});

const ResidentDetailModel = mongoose.model("Feature", residentDetailSchema);

export default ResidentDetailModel;
