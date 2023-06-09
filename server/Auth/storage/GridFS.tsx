const path = require("path");
const crypt = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const DB = process.env.MONGODB_URL;

const storage = new GridFsStorage({
    url: DB,
    file: (req:any, file:any) => {
        return new Promise((resolve, reject) => {
            crypt.randomBytes(16, (err:any, buf:any) => {
                if (err) {
                    return reject(err);
                }
                const filename =
                    buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename,
                    originalname: file.originalname,
                    bucketName: "uploads",
                };
                resolve(fileInfo);
            });
        });
    },
});
const upload = multer({ storage });

module.exports = { upload };
