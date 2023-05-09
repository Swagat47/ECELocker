import mongoose, { Schema } from "mongoose";
import { IResume } from "../config/interface";

const resumeSchema = new mongoose.Schema(
  {
    //_id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: [true, "Please add your CV Name"],
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

resumeSchema.path("_id");

export default mongoose.model<IResume>("Resume", resumeSchema);
