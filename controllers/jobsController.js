import Meal from "../models/Meal.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const createJob = async (req, res) => {
  const { title, date } = req.body;
  if (!title || !date) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const meal = await Meal.create(req.body);
  res.status(StatusCodes.CREATED).json({ meal });
};

const getAllJobs = async (req, res) => {
  res.send("get All Jobs");
};

const updateJob = async (req, res) => {
  res.send("update job");
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

const showStats = async (req, res) => {
  res.send("show Stats");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
