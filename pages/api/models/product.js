import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Product";

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true
    },
    content: {
      type: String,
      minlength: 200
    },
    mediaId: { type: String },
    mediaTime: { type: Number },
    filename: { type: String }
  },
  { timestamps: true }
);

const curriculumSchema = new mongoose.Schema({
  title: String,
  lessons: [lessonSchema]
});

const ProductSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    imgurl: { type: String, required: true },
    title: { type: String, required: true },
    people: { type: String, required: true },
    genre: { type: String, required: true },
    location: { type: String, required: true },
    meetingcycle: { type: String, required: true },
    meetday: { type: String },
    firstmeet: { type: Date, required: true },
    body: { type: String, required: true },
    price: { type: Number, required: true, default: 35000 },
    saleprice: { type: Number, required: true, default: 0 },
    quanity: { type: Number, required: true, default: 15 },
    isvod: { type: Boolean, required: true, default: false },
    islive: { type: Boolean, required: true, default: false },
    joinMembr: [{ type: Schema.Types.ObjectId, ref: "User" }],
    favoriteduser: [{ type: Schema.Types.ObjectId, ref: "User" }],
    curriculum: [curriculumSchema]
    // lessons: [lessonSchema]
  },
  {
    timestamps: true
  }
);

// ProductSchema.virtual("reviews", {
//   ref: "Review",
//   localField: "_id",
//   foreignField: "product"
// });

// ProductSchema.set("toObject", { virtuals: true });
// ProductSchema.set("toJSON", { virtuals: true });

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, ProductSchema, "products");
