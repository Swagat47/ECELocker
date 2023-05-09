import mongoose, { Schema } from "mongoose";
import { IStatistics } from "../config/interface";

const statisticsSchema = new mongoose.Schema(
  {
    //_id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: [true, "Please add your name"],
      trim: true,
      maxLength: [40, "40 chareacter limit"],
    },
    email: {
      type: String,
      required: [true, "Enter your college email address"],
      trim: true,
      unique: true,
    },
    branch: {
      type: String,
      required: [true, "Enter your branch"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Please add company name"],
      trim: true,
      maxLength: [40, "40 chareacter limit"],
    },
    ctc: {
      type: String,
      required: [true, "Please add CTC"],
      trim: true,
      maxLength: [40, "40 chareacter limit"],
    },
    year: {
      type: Number,
      required: [true, "Please enter the year"],
    },
    cluster: {
      type: Number,
      required: [true, "Please enter the cluster"],
    },
  },
  {
    timestamps: true,
  }
);

statisticsSchema.path("_id");

export default mongoose.model<IStatistics>("Statistics", statisticsSchema);
