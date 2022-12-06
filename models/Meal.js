import mongoose from "mongoose";

const MealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide meal title"],
      minlength: 3,
      maxlength: 100,
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Please provide date for this meal"],
    },
    type: {
      type: String,
      enum: [
        "8-10 Great score - Stable glucose response",
        "5-7 Moderate glucose response. Swapping certain ingredients or experimenting with meal timing may help.",
        "1-4 High glucose response. Pay attention and consider avoiding",
        "No score yet",
      ],
      default: "No score yet",
      required: [false, "Please provide a meal score"],
    },
    type: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
      default: "Snack",
      required: [true, "Please provide a meal type"],
    },
    location: {
      type: String,
      default: "my city",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Meal", MealSchema);