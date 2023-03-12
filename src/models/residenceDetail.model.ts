import mongoose from "mongoose";
import { type } from "os";
import { number } from "zod";

const residentDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "city",
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
      roomTYpeId: {
        type: mongoose.Schema,
        ref: "roomType",
        require: true,
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
  address: {
    line1: {
      type: String,
    },
  },
  roomPhotos: [{ type: String, require: true }],
  dinningAreaPhotos: [{ type: String, require: true }],
  commonAreaPhotos: [{ type: String, require: true }],
  facilitiesList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "feature",
    },
  ],
});

const ResidentDetailModel = mongoose.model("Feature", residentDetailSchema);

export default ResidentDetailModel;
