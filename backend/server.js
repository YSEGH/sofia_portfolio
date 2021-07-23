import express from "express";
import path from "path";
const app = express();

app.use(express.json());

const __dirname = path.resolve();

app.use("/static-files", express.static(path.join(__dirname, "/static-files")));

app.listen(3001, () => console.log("Server is ready !"));
