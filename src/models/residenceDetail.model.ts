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
        type: Number,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "feature",
    },
  ],
  roomPhotos: [{ type: String, require: true }],
  dinningAreaPhotos: [{ type: String, require: true }],
  commonAreaPhotos: [{ type: String, require: true }],
  googleMapUrl: {
    type: String,
    require: true,
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    address: String,
    description: String,
  },
});

const ResidentDetailModel = mongoose.model("Feature", residentDetailSchema);

export default ResidentDetailModel;
