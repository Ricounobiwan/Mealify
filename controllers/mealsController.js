import Meal from "../models/Meal.js";
import Glucose from "../models/Glucose.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

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
  const { mealScore, mealType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  // add stuff based on conditions

  if (mealScore && mealScore !== "all") {
    queryObject.mealScore = mealScore;
  }
  if (mealType && mealType !== "all") {
    queryObject.mealType = mealType;
  }
  if (search) {
    queryObject.mealTitle = { $regex: search, $options: "i" };
  }

  // NO AWAIT
  let result = Meal.find(queryObject);

  // chain sort conditions
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("mealTitle");
  }
  if (sort === "z-a") {
    result = result.sort("-mealTitle");
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  // get the meals
  const meals = await result;

  const totalMeals = await Meal.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalMeals / limit);

  res.status(StatusCodes.OK).json({ meals, totalMeals, numOfPages });
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
  let stats = await Meal.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$mealScore", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    noScoreYet: stats.noScoreYet || 0,
    highGlucoseResponse: stats.highGlucoseResponse || 0,
    moderateGlucoseResponse: stats.moderateGlucoseResponse || 0,
    stableGlucoseResponse: stats.noScoreYet || 0,
  };
  let monthlyMeals = await Meal.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);

  monthlyMeals = monthlyMeals
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  // ============================================= TODO
  // let statsGlucose = await Glucose.aggregate([
  //   { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
  //   { $match: { base_type: "glucose" } },
  // ]);

  let dailyGlucose = await Glucose.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $match: { base_type: "glucose" } },
    // {
    //   $sort: {
    //     "_id.year": -1,
    //     "_id.month": -1,
    //     "_id.dayOfMonth": -1,
    //     "_id.hour": -1,
    //   },
    // },
  ]);

  // dailyGlucose = dailyGlucose.map((item) => {
  //   const {
  //     _id: { createdAt },
  //     updatedAt,
  //     glucose_value,
  //   } = item;
  //   const date = moment().format("MMMM Do YYYY, h:mm:ss a"); // moment().month(createdAt); // .year(createdAt).format("MMM Y");
  //   return { updatedAt, date, glucose_value };
  // });

  res.status(StatusCodes.OK).json({ defaultStats, monthlyMeals, dailyGlucose });
};

export { createMeal, deleteMeal, getAllMeals, updateMeal, showStats };
