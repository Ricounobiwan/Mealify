import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";

// ===== FOR DEPLOYMENT
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// ===== FOR SECURITY PACKAGES
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// ====================

// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import mealsRouter from "./routes/mealsRoutes.js";
import glucoseRouter from "./routes/glucoseRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ===== FOR DEPLOYMENT
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));
// ====================

app.use(express.json());

// ===== FOR SECURITY PACKAGES
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// ====================

app.get("/api/v1", (req, res) => {
  res.json({ msg: "API!" });
});

app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/meals", authenticateUser, mealsRouter);
app.use("/api/v1/glucose", authenticateUser, glucoseRouter);

// ===== FOR DEPLOYMENT
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// ====================

// if no routes match...
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Port and listening
const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log("Error: ", error);
    console.log("process.env.MONGO_URL ", process.env.MONGO_URL);
  }
};

start();
