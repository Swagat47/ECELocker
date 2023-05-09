import User from "../models/userModel";
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const getUsers = async (req: any, res: any) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

const statusPlaced = async (req: any, res: any) => {
  try {
    const user_email = req.body.email;
    User.findOneAndUpdate({email:user_email} , {placed:"true"}, {new: true})
    .then((user) => {
        if(!user) return res.status(400).json({ msg: "Invalid User" });
        return res.json({ msg: "Updated Successfully!", user });
    })
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}

const updateCluster = async (req: any, res: any) => {
  try {
    const user_email = req.body.email;
    const clusters = req.body.clusters;
    User.findOneAndUpdate({email:user_email} , {clusters}, {new: true})
    .then((user) => {
        if(!user) return res.status(400).json({ msg: "Invalid User" });
        return res.json({ msg: "Updated Successfully!", user });
    })
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}

const userCtrl = {
  getUsers,
  statusPlaced,
  updateCluster
};

export default userCtrl;
