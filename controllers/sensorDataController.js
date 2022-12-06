import SensorData from "../models/SensorData.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const createSensorData = async (req, res) => {
  res.send("create job");
};

const getAllSensorData = async (req, res) => {
  res.send("get All Jobs");
};

const updateSensorData = async (req, res) => {
  res.send("update job");
};

const deleteSensorData = async (req, res) => {
  res.send("delete job");
};

const showSensorDataStats = async (req, res) => {
  res.send("show Stats");
};

export {
  createSensorData,
  getAllSensorData,
  updateSensorData,
  deleteSensorData,
  showSensorDataStats,
};
