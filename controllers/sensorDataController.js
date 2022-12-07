import SensorData from "../models/SensorData.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const createSensorData = async (req, res) => {
  res.send("create sensor data");
};

const getAllSensorData = async (req, res) => {
  res.send("get All sensor data");
};

const updateSensorData = async (req, res) => {
  res.send("update sensor data");
};

const deleteSensorData = async (req, res) => {
  res.send("delete sensor data");
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
