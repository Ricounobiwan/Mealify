import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import Meal from "./models/Meal.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Meal.deleteMany();
    const jsonProducts = JSON.parse(
      await readFile(new URL("./mock-data.json", import.meta.url))
    );
    await Meal.create(jsonProducts);
    console.log("Success in populating data!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
