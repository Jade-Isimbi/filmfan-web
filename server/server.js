import express from "express";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import routes from "./routes/index.js";

const app = express();
const PORT = 3002;


const baseUrl = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TOKEN = process.env.TOKEN;
const SECRET_KEY = process.env.JWT_SECRET;
const USERS_FILE = "./users.json";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Request Headers=====>>:", req.headers);
  next();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Authorization", `Bearer ${TOKEN}`);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  next();
});

app.use(("/", routes));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

export default app;
