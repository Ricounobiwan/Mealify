import express from "express";
const router = express.Router();

import {
  createMeal,
  deleteMeal,
  getAllMeals,
  updateMeal,
  showStats,
} from "../controllers/mealsController.js";

router.route("/").post(createMeal).get(getAllMeals);
// remember about :id
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteMeal).patch(updateMeal);

export default router;
