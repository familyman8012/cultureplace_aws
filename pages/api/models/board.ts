import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Board";

const schema = new Schema(
  {
    productId: { type: String, required: true },
    parentId: { type: String, required: true },
    noticecheck: { type: Boolean, required: true, default: false },
    title: { type: String, required: true },
    body: { type: String, required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    nickname: { type: String, required: true },
    readcount: { type: Number, required: true, default: 0 },
    commentcount: { type: Number, required: true, default: 0 }
  },
  {
    timestamps: true
  }
);

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "Boards");
