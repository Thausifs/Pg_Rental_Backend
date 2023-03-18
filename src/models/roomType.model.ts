import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema({
  typeOfRoom: {
    type: String,
    require: true,
    unique: true,
  },
  slug: {
    type: String,
    require: true,
    unique: true,
  },
});

roomTypeSchema.index({ slug: 1 }, { unique: true });

const roomTypeModel = mongoose.model("roomType", roomTypeSchema);

export default roomTypeModel;
