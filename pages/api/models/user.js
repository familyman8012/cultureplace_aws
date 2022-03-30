import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "User";

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: [true, "email must be unique"]
    },
    userpwd: String,
    phone: String,
    salt: String,
    name: String,
    gender: String,
    agegroup: String,
    image: String,
    role: {
      type: String,
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "users");
