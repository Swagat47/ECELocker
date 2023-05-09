import Notices from "../models/noticeModel";
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
import { deleteFile } from "./filecontroller";

const upload_notice = async (req: any, res: any) => {
    try {
        const notice = {
            name: req.file.originalname,
            docId: req.file.id,
        };
        const savedNotice = new Notices(notice);
        await savedNotice.save();
        res.json(savedNotice);
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
};

const delete_notice = async (req: any, res: any) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "Url Is Invalid" });
    deleteFile(req.params.id)
        .then((data: any) => {
            Notices.findOne({ docId: req.params.id }).then((data: any) => {
                data.remove();
                res.json({
                    message: "Notice deleted",
                    data,
                });
            });
        })
        .catch((err: any) => res.status(404).json({ message: err.message }));
};

const getNotice = async (req: any, res: any) => {
    try {
        const notices = await Notices.find();
        res.json(notices);
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
};

const noticeCtrl = {
    upload_notice,
    delete_notice,
    getNotice,
};

export default noticeCtrl;
