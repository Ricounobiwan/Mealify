import express from "express";
const router = express.Router();

import { getAllGlucose } from "../controllers/glucoseController.js";

router.route("/").get(getAllGlucose); // post(createMeal).get(getAllGlucose);
// remember about :id
// router.route("/stats").get(showStats);

export default router;
