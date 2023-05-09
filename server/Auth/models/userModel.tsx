import mongoose, { Schema } from "mongoose";
import { IUser } from "../config/interface";

const userSchema = new mongoose.Schema(
  {
    //_id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: [true, "Please add your name"],
      trim: true,
      maxLength: [40, "40 chareacter limit"],
    },
    rollnumber: {
      type: String,
      //required: [true, "Please add your rollnumber"],
      trim: true,
      //unique: true,
      maxLength: [40, "40 chareacter limit"],
    },
    email: {
      type: String,
      required: [true, "Enter your college email address"],
      trim: true,
      unique: true,
    },
    personalemail: {
      type: String,
      //required: [true, "Enter your college personal email address"],
      trim: true,
      //unique: true,
    },
    branch: {
      type: String,
      required: [true, "Enter your branch"],
      trim: true,
    },
    programme: {
      type: String,
      //required: [true, "Enter your programme"],
      trim: true,
    },
    cgpa: {
      type: Number,
      //required: [true, "Enter your cgpa"],
      trim: true,
    },
    percentage10th: {
      type: Number,
      //required: [true, "Enter your 10th percentage"],
      trim: true,
    },
    percentage12th: {
      type: Number,
      //required: [true, "Enter your 12th percentage"],
      trim: true,
    },
    backlogs: {
      type: Number,
      //required: [true, "Enter your backlogs"],
      trim: true,
    },
    phone: {
      type: Number,
      required: [true, "Enter your phone number"],
      trim: true,
      //unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password must be atleast 6 character long"],
    },
    avatar: {
      type: String,
      default:
        "https://drive.google.com/file/d/1ypEmyY6il5nI6vc_nGxqOT-zE9HT_zAu/view?usp=sharing",
    },
    role: {
      type: String,
      required: [true],
      default: "user",
    },
    clusters: {
      type: [Number],
      default: [],
    },
    resume: {
      type: [String],
      default: [],
    },
    placed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.path("_id");

export default mongoose.model<IUser>("User", userSchema);
