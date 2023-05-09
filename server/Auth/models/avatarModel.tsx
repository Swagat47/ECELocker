import mongoose, { Schema } from "mongoose";
import { IAvatar } from "../config/interface";

const avatarSchema = new mongoose.Schema(
  {
    //_id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: [true, "Please add your Image Name"],
      trim: true,
      maxLength: [100, "100 chareacter limit"],
    },
    docId: {
      type: String,
      required: [true, "Please add Id"],
      trim: true,
      maxLength: [40, "40 chareacter limit"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      trim: true,
      maxLength: [100, "100 chareacter limit"],
    },
  },
  {
    timestamps: true,
  }
);

avatarSchema.path("_id");

export default mongoose.model<IAvatar>("Avatar", avatarSchema);
