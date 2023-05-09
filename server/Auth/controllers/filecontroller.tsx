import mongoose from "mongoose";
const { ObjectId } = require("mongodb");

let gridfsBucket: any;
const conn = mongoose.connection;
conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads",
    });
});

const upload = async (req: any, res: any) => {
    try {
        res.json(req.file);
    } catch (err) {
        return res.status(500).json({ msg: "authCtrl error" });
    }
};

const stream = async (req: any, res: any) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "Image Url Is Invalid" });
    gridfsBucket
        .find({ _id: ObjectId(req.params.id) })
        .next()
        .then((file: any) => {
            if (!file)
                return res.status(404).json({
                    message: "No file exists",
                });
            const readstream = gridfsBucket.openDownloadStream(file._id);
            readstream.pipe(res);
        })
        .catch((err: any) =>
            res.status(404).json({
                message: "Error Fetching File",
            })
        );
};

const single = async (req: any, res: any) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "Image Url Is Invalid" });
    gridfsBucket
        .find({ _id: ObjectId(req.params.id) })
        .next()
        .then((file: any) => {
            if (!file)
                return res.status(404).json({
                    message: "No file exists",
                });
            else return res.json(file);
        })
        .catch((err: any) =>
            res.status(404).json({
                message: "Error Fetching File",
            })
        );
};

export const deleteFile = async (id: any) => {    
    return gridfsBucket
        .find({ _id: ObjectId(id) })
        .next()
        .then((file: any) => {
            console.log(file);
            if (!file) throw new Error("No file exists");
            return gridfsBucket
                .delete(file._id)
                .then((data: any) => ({ message: "File deleted", data }));
        });
};

const delete_file = async (req: any, res: any) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "Image Url Is Invalid" });
    deleteFile(req.params.id)
        .then((data: any) => res.json(data))
        .catch((err: any) =>
            res.status(404).json({ message: "Error Fetching File" })
        );
};

const fileCtrl = {
    upload,
    stream,
    single,
    delete_file,
};

export default fileCtrl;
