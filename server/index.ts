import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import router from "./Auth/Routes/index";

//Database
import "./Auth/config/database";

//Middleware
const app = express();
//console.log("-------------------------------------------------------");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(morgan("dev"));
app.use(cookieParser());

//Routes
app.use("/api", router);

//Server Listerning
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("server is running on port", PORT, "http://localhost:4000/");
});
