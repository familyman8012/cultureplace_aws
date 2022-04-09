import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Live";

const schema = new Schema(
  {
    result: mongoose.Schema.Types.Mixed
  },
  {
    timestamps: true
  }
);

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "Lives");
