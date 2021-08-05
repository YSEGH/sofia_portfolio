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

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use(
  "/js",
  (req, res, next) => {
    req.url = req.url + ".gz";
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Encoding", "gzip");
    res.setHeader("Content-Disposition", "gzip");
    next();
  },
  express.static(path.join(__dirname, "/frontend/dist/js"))
);
app.use(
  "/css",
  (req, res, next) => {
    req.url = req.url + ".gz";
    res.setHeader("Content-Type", "text/css");
    res.setHeader("Content-Encoding", "gzip");
    res.setHeader("Content-Disposition", "gzip");
    next();
  },
  express.static(path.join(__dirname, "/frontend/dist/css"))
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

app.listen(process.env.PORT || 3001, () => console.log("Server is ready !"));
