import Resume from "../models/resumeModel";
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
import { deleteFile } from "./filecontroller";

const upload_resume = async (req: any, res: any) => {
    try {
        const email = req.body.email;
        const resume = {
            name: req.file.originalname,
            docId: req.file.id,
            email,
        };
        const savedResume = new Resume(resume);
        await savedResume.save();
        res.json(savedResume);
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
};

const delete_resume = async (req: any, res: any) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "Url Is Invalid" });
    deleteFile(req.params.id)
        .then((data: any) => {
            Resume.findOne({ docId: req.params.id }).then((data: any) => {
                data.remove();
                res.json({
                    message: "Resume deleted",
                    data,
                });
            });
        })
        .catch((err: any) => res.status(404).json({ message: err.message }));
};

const getResume = async (req: any, res: any) => {
    try {
        const email = req.body.email;
        const resumes = await Resume.find({ email });
        res.json(resumes);
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
};

const resumeCtrl = {
    upload_resume,
    delete_resume,
    getResume,
};

export default resumeCtrl;
