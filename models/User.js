import mongoose from "mongoose";
import validator from "validator";

// create a schema/structure
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
  },
  lastName: {
    type: String,
    maxlength: 20,
    default: "lastName",
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    default: "my city",
  },
});

export default mongoose.model("User", UserSchema);
