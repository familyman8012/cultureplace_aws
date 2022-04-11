import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Mainvisimg";

const schema = new Schema(
  {
    pclocation: String,
    molocation: String,
    showNum: { type: Number, default: 0 },
    alt: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "Mainvisimgs");
