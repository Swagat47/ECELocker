import { Request, Response } from "express";
import Statistics from "../models/statisticsModel";
import mongoose from "mongoose";

const upload_statistics = async (req: any, res: any) => {
  try {
    const placement = {
      name: req.body.name,
      email: req.body.email,
      branch: req.body.branch,
      company: req.body.company,
      ctc: req.body.ctc,
      year: req.body.year,
      cluster: req.body.cluster,
    };
    const placementDetails = new Statistics(placement);
    await placementDetails.save();
    res.json(placementDetails);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

const get_group_statistics = async (req: any, res: any) => {
  try {
    Statistics.aggregate([
      {
        $group:
        {
          _id: { year: "$year" },
        }
      }
    ])
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.json(error)
      })
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

const filter_statistics = async (req: any, res: any) => {
  try { 
    const year = req.body.year;
    const statistics = await Statistics.find({ year: year });
    const ret_statistics = statistics.map((statistic) => {
      return {
        name: statistic.name,
        email: statistic.email,
        branch: statistic.branch,
        company: statistic.company,
        ctc: statistic.ctc,
        year: statistic.year,
        cluster: statistic.cluster,
      };
    });
    res.json(ret_statistics);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};


const statisticsCtrl = {
  upload_statistics,
  get_group_statistics,
  filter_statistics
};

export default statisticsCtrl;
