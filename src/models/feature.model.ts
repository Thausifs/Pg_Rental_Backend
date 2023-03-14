import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  feature_name: {
    type: String,
    require: true,
  },
  icon: {
    type: String,
    require: true,
  },
});

const FeatureModel = mongoose.model("Feature", featureSchema);

export default FeatureModel;
