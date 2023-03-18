import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: {
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

const City = mongoose.model("city", citySchema);

export default City;
