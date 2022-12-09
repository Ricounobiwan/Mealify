import mongoose from "mongoose";

const GlucoseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    base_time_unix: {
      type: String,
      required: true,
    },
    base_time_string: {
      type: Date,
      required: true,
    },
    base_type: {
      type: String,
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    customEvent: {
      type: String,
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    glucose_value: {
      type: Number,
    },
    meal_title: {
      type: String,
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    meal_score: {
      type: Number,
    },
    meal_tags: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    exercise_title: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    exercise_duration_min: {
      type: Number,
    },
    sleep_duration_min: {
      type: Number,
    },
    note_note: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    customEvent_title: {
      type: String,
      maxlength: 30,
      trim: true,
    },
    customEvent_duration_min: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Glucose", GlucoseSchema);
