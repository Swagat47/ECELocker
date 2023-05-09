import mongoose from "mongoose";
import { ICompanyUserRelation } from "../config/interface";

const companyUserRelationSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: [true, "Please add user_email"],
    },
    company_id: {
        type: String,
        required: [true, "Please add company id"],
    }
},

{
    timestamps: true,
}
);

companyUserRelationSchema.path("_id");

export default mongoose.model<ICompanyUserRelation>("CompanyUserRelation", companyUserRelationSchema);