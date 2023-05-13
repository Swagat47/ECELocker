import mongoose, { Schema } from "mongoose";
import { INotes } from "../config/interface";

const notesSchema = new mongoose.Schema(
  {
    //_id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: [true, "Please add file name"],
      trim: true,
      maxLength: [100, "100 chareacter limit"],
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

notesSchema.path("_id");

export default mongoose.model<INotes>("Notes", notesSchema);
