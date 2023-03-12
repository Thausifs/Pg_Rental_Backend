import mongoose from "mongoose";

const facilities = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  iconImageUrl: {
    type: String,
    require: true,
  },
});

const FacilitiesModel = mongoose.model("feature", facilities);

export default FacilitiesModel;
