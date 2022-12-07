import Meal from "../models/Meal.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const createMeal = async (req, res) => {
  console.log("req.body", req.body);
  const { mealTitle, mealDate } = req.body;
  if (!mealTitle || !mealDate) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const meal = await Meal.create(req.body);
  res.status(StatusCodes.CREATED).json({ meal });
};

const getAllMeals = async (req, res) => {
  res.send("get All Meals");
};

const updateMeal = async (req, res) => {
  res.send("update meal");
};

const deleteMeal = async (req, res) => {
  res.send("delete meal");
};

const showStats = async (req, res) => {
  res.send("show Stats");
};

export { createMeal, deleteMeal, getAllMeals, updateMeal, showStats };
