import mongoose, { Schema } from "mongoose";
import { ICompany } from "../config/interface";

const companySchema = new mongoose.Schema(
    {
        //_id: mongoose.Schema.Types.ObjectId,
        name: {
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
        location: {
            type: String,
            required: [true, "Enter Comapny Location"],
            trim: true,
        },
        cluster: {
            type: Number,
            required: [true, "Enter Company Cluster"],
            trim: true,
        },
        branches: {
            type: [String],
            required: [true, "Enter Branches Eligible"],
            trim: true,
        },
        cgpa: {
            type: Number,
            required: [true, "Enter your cgpa"],
            trim: true,
        },
        percentage10: {
            type: Number,
            required: [true, "Enter your 10th percentage"],
            trim: true,
        },
        percentage12: {
            type: Number,
            required: [true, "Enter your 12th percentage"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Enter Company Description"],
            trim: true,
        },
        role: {
            type: String,
            required: [true, "Enter Job Profile"],
            trim: true,
        },
        deadline: {
            type: Date,
            required: [true, "Enter Deadline"],
        },
        
    },
    {
        timestamps: true,
    }
);

companySchema.path("_id");

export default mongoose.model<ICompany>("Company", companySchema);
