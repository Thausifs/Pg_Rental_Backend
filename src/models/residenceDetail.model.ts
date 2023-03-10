import mongoose from "mongoose";

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
  occupanycies: [{}],
  address: {
    line1: {
      type: String,
    },
  },
});

const ResidentDetailModel = mongoose.model("Feature", residentDetailSchema);

export default ResidentDetailModel;
