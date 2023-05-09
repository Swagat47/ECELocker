import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import sendMail from "../config/contactMail";
// import sendMail from "../config/sendMail";
import { validateEmail } from "../middleware/valid";
const contactCtrl = {
    contact: async (req: Request, res: Response) => {
        try {
            const {
                name,
                email,
                message,
            } = req.body;



            // if (validateEmail(email)) {
                sendMail(email,name,message);
                return res.json({ msg: "Success!! Email sent" });
            // }
        } catch (err) {
            return res.status(500).json({ msg: "contactCtrl error" });
        }
    },
};
export default contactCtrl;