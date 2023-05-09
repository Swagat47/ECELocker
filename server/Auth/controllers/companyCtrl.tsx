import { Request, Response } from "express";
import Company from "../models/companyModel";
import mongoose from "mongoose";


const upload_company = async (req: any, res: any) => {
    try {
        const company = {
            name: req.body.name,
            ctc: req.body.ctc,
            location: req.body.location,
            cluster: req.body.cluster,
            branches: req.body.branches.map((item: any) => item.value),
            cgpa: req.body.cgpa,
            percentage10: req.body.percentage10,
            percentage12: req.body.percentage12,
            description: req.body.description,
            role: req.body.role,
            deadline: req.body.deadline,
        };
        const savedCompany = new Company(company);
        await savedCompany.save();
        res.json(savedCompany);
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
};

const edit_company = async (req: any, res: any) => {
    try {
        const company = {
            name: req.body.name,
            ctc: req.body.ctc,
            location: req.body.location,
            cluster: req.body.cluster,
            branches: req.body.branches.map((item: any) => item.value),
            cgpa: req.body.cgpa,
            percentage10: req.body.percentage10,
            percentage12: req.body.percentage12,
            description: req.body.description,
            role: req.body.role,
            deadline: req.body.deadline,
        };
        Company.findOneAndUpdate({ _id: req.params.id }, company, {
            new: true,
        }).then((data: any) => {
            res.json({
                message: "Company updated",
                data,
            });
        }).catch((err: any) => res.status(404).json({ message: err.message }));
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
};

const delete_company = async (req: any, res: any) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "Url Is Invalid" });
        Company.findOneAndDelete({ _id: req.params.id }).then((data: any) => {
            res.json({
                message: "Company deleted",
                data,
            });
        }).catch((err: any) => res.status(404).json({ message: err.message }));
};

const get_company = async (req: any, res: any) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
};

const companyCtrl = {
    edit_company,
    upload_company,
    delete_company,
    get_company,
};

export default companyCtrl;