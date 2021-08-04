import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import infoRouter from "./routes/infoRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("DB connected.")
);

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/info", infoRouter);
app.use("/api/item", itemRouter);
app.use("/api/files", imageRouter);

const __dirname = path.resolve();

app.use("/static-files", express.static(path.join(__dirname, "/static-files")));

app.listen(3001, () => console.log("Server is ready !"));
