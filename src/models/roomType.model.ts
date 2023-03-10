import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema({
  typeOfRoom: {
    type: String,
    require: true,
  },
});
