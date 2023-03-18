import mongoose from "mongoose";

const facilities = new mongoose.Schema({
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
  iconImageUrl: {
    type: String,
    require: true,
  },
});

const FacilitiesModel = mongoose.model("facilities", facilities);

export default FacilitiesModel;
