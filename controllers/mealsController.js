import Meal from "../models/Meal.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createMeal = async (req, res) => {
  const { mealTitle, mealDate } = req.body;
  if (!mealTitle || !mealDate) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const meal = await Meal.create(req.body);
  res.status(StatusCodes.CREATED).json({ meal });
};

const getAllMeals = async (req, res) => {
  const meals = await Meal.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ meals, totalMeals: meals.length, numOfPages: 1 });
};

const updateMeal = async (req, res) => {
  const { id: mealId } = req.params;
  const { mealDate, mealTitle } = req.body;
  if (!mealTitle || !mealDate) {
    throw new BadRequestError("Please provide all values");
  }
  const meal = await Meal.findOne({ _id: mealId });
  if (!meal) {
    throw new NotFoundError(`No meal with id :${mealId}`);
  }

  // Check permissions: if it is the right user to update the meal
  checkPermissions(req.user, meal.createdBy);

  const updatedMeal = await Meal.findOneAndUpdate({ _id: mealId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedMeal });
};

const deleteMeal = async (req, res) => {
  const { id: mealId } = req.params;

  const meal = await Meal.findOne({ _id: mealId });
  if (!meal) {
    throw new NotFoundError(`No meal with id :${mealId}`);
  }

  // Check permissions: if it is the right user to delete the meal
  checkPermissions(req.user, meal.createdBy);

  await meal.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Meal removed" });
};

const showStats = async (req, res) => {
  res.send("show Stats");
};

export { createMeal, deleteMeal, getAllMeals, updateMeal, showStats };
