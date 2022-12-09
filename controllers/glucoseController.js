import Glucose from "../models/Glucose.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

// TODO: TO BE IMPLEMENTED
const getAllGlucose = async (req, res) => {
  const glucose = await Glucose.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ glucose, totalGlucose: glucose.length, numOfPagesGlucose: 1 });
};

export { getAllGlucose };
