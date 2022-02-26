const express = require("express");
const cors = require("cors");
const connect = require("./database/db");
const mongoose = require("mongoose");
const Todo = require("./models/todo.model");
const app = express();
require("dotenv").config();

// connect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", async (req, res) => {
  if (process.env.NODE_ENV === "development") {
    await mongoose
      .connect(process.env.MONGO_CON_STR_DEV)
      .then(() => console.log("Database connection..."))
      .catch((err) => console.error(err));

    res.json({
      message: "OK",
      env: process.env.NODE_ENV,
      MONGO_URL: process.env.MONGO_CON_STR_DEV,
      new_ver: "0.0.2",
    });
  }

  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "test"
  ) {
    await mongoose
      .connect(process.env.MONGO_CON_STR_POD)
      .then(() => console.log("Database connection..."))
      .catch((err) => console.error(err));

    res.json({
      message: "OK",
      env: process.env.NODE_ENV,
      MONGO_URL: process.env.MONGO_CON_STR_POD,
      new_ver: "0.0.2",
    });
  }
});

// ADD
app.post("/api/add", async (req, res) => {
  const text = req.body.text;

  const newTodo = new Todo({ text });

  await newTodo.save();

  res.json({ status: "ok", data: newTodo });
});

// GET
app.get("/api/get", async (req, res) => {
  const todos = await Todo.find({});

  res.json({ status: "ok", data: todos });
});

// DELETE ONE
app.delete("/api/del", async (req, res) => {
  let id = req.body.id;
  const test = req.body.test;

  if (test != undefined) {
    const findId = await Todo.findOne({ text: test });
    id = findId._id.toString();
  }

  await Todo.deleteOne({ _id: id });

  res.json({ status: "ok" });
});

// CLEAR
app.post("/api/clear", async (req, res) => {
  await Todo.deleteMany({});

  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running..."));

module.exports = app;
