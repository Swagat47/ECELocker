const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
import { deleteFile } from "./filecontroller";
import Avatar from "../models/avatarModel";
import User from "../models/userModel";

const upload_image = async (req: any, res: any) => {
    try {
        const email = req.body.email;
        const avatar = {
            name: req.file.originalname,
            docId: req.file.id,
            email,
        };
        Avatar.findOneAndDelete({email: email}).then((data: any) => {
            console.log("data",data);
            data.remove();
            deleteFile(data.docId);
        });
        const savedAvatar = new Avatar(avatar);
        await savedAvatar.save();
        res.json(savedAvatar);
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
    
};

const delete_image = async (req: any, res: any) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "Url Is Invalid" });
    deleteFile(req.params.id)
        .then((data: any) => {
            Avatar.findOne({ docId: req.params.id }).then((data: any) => {
                data.remove();
                res.json({
                    message: "Profile Pic deleted",
                    data,
                });
            });
        })
        .catch((err: any) => res.status(404).json({ message: err.message }));
};

const getImage = async (req: any, res: any) => {
    try {
        const email = req.body.email;
        const images = await Avatar.find({ email });
        res.json(images);
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
};

const resumeCtrl = {
    upload_image,
    delete_image,
    getImage,

};

export default resumeCtrl;
