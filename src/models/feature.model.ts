import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  feature_name: {
    type: String,
    require: true,
    unique: true,
  },
  slug: {
    type: String,
    require: true,
    unique: true,
  },
  icon: {
    type: String,
    require: true,
  },
});

const FeatureModel = mongoose.model("feature", featureSchema);

export default FeatureModel;
