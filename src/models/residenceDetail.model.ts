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
  feature: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "feature",
    },
  ],
  location: {
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    state: String,
    zip_code: String,
    address: String,
    description: String,
  },
  description: {
    type: String,
    require: true,
  },
  hotelSupportNumber: String,
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

  roomPhotos: [{ type: String, require: true }],
  coverImage: [{ type: String, require: true }],
  dinningAreaPhotos: [{ type: String, require: true }],
  commonAreaPhotos: [{ type: String, require: true }],
  googleMapUrl: {
    type: String,
    require: true,
  },
});

const ResidentDetailModel = mongoose.model("Resident", residentDetailSchema);

export default ResidentDetailModel;
