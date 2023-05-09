import { Request, Response } from "express";
import mongoose from "mongoose";
import CompanyUserRelation from "../models/companyuserRelation";
import Users from "../models/userModel";

const register_user_company = async (req: any, res: any) => {
  try {
    const companyUserRelation = {
      user_email: req.body.user_email,
      company_id: req.body.company_id,
    };
    const savedCompanyUserRelation = new CompanyUserRelation(
      companyUserRelation
    );
    await savedCompanyUserRelation.save();
    res.json(savedCompanyUserRelation);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

const get_user_companys = async (req: any, res: any) => {
  try {
    const companyUserRelation = await CompanyUserRelation.find({
      user_email: req.body.user_email,
    }).populate("company_id");
    res.json(companyUserRelation);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

const get_company_users = async (req: any, res: any) => {
  try {
    const companyUserRelation = await CompanyUserRelation.find({
      company_id: req.body.company_id,
    }).populate("user_email");
    res.json(companyUserRelation);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

const get_user_info = async (req: any, res: any) => {
  try {
    const email_list = req.body.email_list;
    const user = await Users.find({ email: { $in: email_list } });
    const ret_user = user.map((item: any) => {
      return {
        name: item.name,
        rollnumber: item.rollnumber,
        email: item.email,
        personalemail: item.personalemail,
        branch: item.branch,
        programme: item.programme,
        cgpa: item.cgpa,
        percentage10th: item.percentage10th,
        percentage12th: item.percentage12th,
        backlogs: item.backlogs,
        phone: item.phone,
      };
    });
    res.json(ret_user);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

const companyUserRelationCtrl = {
  register_user_company,
  get_user_companys,
  get_company_users,
  get_user_info,
};

export default companyUserRelationCtrl;
