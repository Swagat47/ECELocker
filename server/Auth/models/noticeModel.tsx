import mongoose, { Schema } from "mongoose";
import { INotice } from "../config/interface";

const noticeSchema = new mongoose.Schema(
  {
    //_id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: [true, "Please add your name"],
      trim: true,
      maxLength: [40, "40 chareacter limit"],
    },
    docId: {
      type: String,
      required: [true, "Please add Id"],
      trim: true,
      maxLength: [40, "40 chareacter limit"],
    },
  },
  {
    timestamps: true,
  }
);

noticeSchema.path("_id");

export default mongoose.model<INotice>("Notice", noticeSchema);
