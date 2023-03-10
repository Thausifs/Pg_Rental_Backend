import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  iconImageUrl: {
    type: String,
    require: true,
  },
});

const FeatureModel = mongoose.model("Feature", featureSchema);

export default FeatureModel;
