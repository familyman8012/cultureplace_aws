import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Notice";

const schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true, default: "공지사항" },  
    imgurl: { type: String, required: true },
    body: { type: String, required: true },
    summary : String
  },
  {
    timestamps: true,
  }
);

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "notices");
