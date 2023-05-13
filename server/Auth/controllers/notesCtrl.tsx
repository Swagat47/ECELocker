import Notes from "../models/notesModel";
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
import { deleteFile } from "./filecontroller";

const upload_notes = async (req: any, res: any) => {
  try {
    const notes = {
      name: req.file.originalname,
      docId: req.file.id,
    };
    const savedNotes = new Notes(notes);
    await savedNotes.save();
    res.json(savedNotes);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

const delete_notes = async (req: any, res: any) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).json({ message: "Url Is Invalid" });
  deleteFile(req.params.id)
    .then((data: any) => {
      Notes.findOne({ docId: req.params.id }).then((data: any) => {
        data.remove();
        res.json({
          message: "Notes deleted",
          data,
        });
      });
    })
    .catch((err: any) => res.status(404).json({ message: err.message }));
};

const getNotes = async (req: any, res: any) => {
  try {
    const notes = await Notes.find();
    res.json(notes);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

const notesCtrl = {
  upload_notes,
  delete_notes,
  getNotes,
};

export default notesCtrl;
