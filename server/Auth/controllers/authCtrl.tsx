import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken";
import sendMail from "../config/sendMail";
import { validateAdminRegisterEmail, validateEmail } from "../middleware/valid";
import { IDecodedToken, IUser } from "../config/interface";
import { resolveSoa } from "dns/promises";

const CLIENT_URL = `${process.env.BASE_URL}`;
const TPO_EMAIL = `${process.env.TPO_EMAIL}`;
const authCtrl = {
  adminregister: async (req: Request, res: Response) => {
    try {
      const { name, email, branch, phone, password, role } = req.body;
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "Admin Account already exists." });
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        name,
        email,
        password: passwordHash,
        branch,
        phone,
        role,
      };
      const active_token = generateActiveToken({ newUser });
      const url = `${CLIENT_URL}/active/${active_token}`;

      if (validateAdminRegisterEmail(email)) {
        sendMail(TPO_EMAIL, url, "NITH TPR/TPO Verify Email");
        return res.json({ msg: "Success!! Please get your Email Verified" });
      }
    } catch (err) {
      return res.status(500).json({ msg: "authCtrl error" });
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const {
        name,
        email,
        rollnumber,
        personalemail,
        branch,
        programme,
        cgpa,
        percentage10th,
        percentage12th,
        backlogs,
        phone,
        password,
        clusters,
      } = req.body;
      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: "Account already exists." });

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        name,
        email,
        password: passwordHash,
        rollnumber,
        personalemail,
        branch,
        programme,
        cgpa,
        percentage10th,
        percentage12th,
        backlogs,
        phone,
        clusters,
      };

      const active_token = generateActiveToken({ newUser });
      const url = `${CLIENT_URL}/active/${active_token}`;

      if (validateEmail(email)) {
        sendMail(email, url, "NITH Verify your email");
        return res.json({ msg: "Success!! Please check your email" });
      }
    } catch (err) {
      return res.status(500).json({ msg: "authCtrl error" });
    }
  },
  updateInfo: async (req: Request, res: Response) => {
    try {
      const email = req?.body?.email;
      if (!email) return res.status(400).json({ msg: "Invalid User" });
      Users.findOneAndUpdate({ email }, req.body).then((user) => {
        if (!user) return res.status(400).json({ msg: "Invalid User" });
        return res.json({ msg: "Updated Successfully!" });
      });
    } catch (err) {
      return res.status(500).json({ msg: "Update error" });
    }
  },

  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;

      console.log("active_token", active_token);
      console.log(
        "---------------------------------------------------------------------------"
      );

      //@ts-ignore
      const decoded = jwt.verify(
        active_token,
        `${process.env.ACTIVE_TOKEN_SECRET}`
      ) as IDecodedToken;
      console.log("decoded", decoded);
      const { newUser } = decoded;

      const user = new Users(newUser);

      if (!newUser)
        return res.status(400).json({ msg: "Invalid Authentication" });

      await user.save();
      res.json({ msg: "Account has benn activated!" });
    } catch (err) {
      console.log("error hai");
      console.log(req.body);
      console.log(err);
      let errMessage;
      //@ts-ignore
      if (err.code === 11000) {
        //@ts-ignore
        errMessage = Object.keys(err.keyValue)[0] + " already exists.";
      } else {
        //@ts-ignore
        let name = Object.keys(err.errors)[0];
        //@ts-ignore
        errMessage = err.errors[`${name}`].message;
      }
      //@ts-ignore
      return res.status(500).json({ msg: errMessage });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Account does not exist" });
      }

      loginUser(user, password, res);

      console.log(req.body);
    } catch (err) {
      //@ts-ignore
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshtoken", { path: `/api/refresh_token` });
      return res.json({ msg: "Logged out!" });
    } catch (err) {
      //@ts-ignore
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      const decoded = jwt.verify(
        rf_token,
        `${process.env.REFRESH_TOKEN_SECRET}`
      ) as IDecodedToken;
      if (!decoded.id)
        return res.status(400).json({ msg: "Please login now!" });

      const user = await Users.findById(decoded.id).select("-password");
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const access_token = generateAccessToken({ id: user._id });
      return res.json({ access_token });
    } catch (err) {
      //@ts-ignore
      return res.status(500).json({ msg: err.message });
    }
  },
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ msg: "Incorrect Password" });

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id });

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
  });

  res.json({
    msg: "Login Success!",
    access_token,
    user: { ...user._doc, password: "" },
  });
};

export default authCtrl;
