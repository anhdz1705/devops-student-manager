require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// connect DB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// schema
const Student = mongoose.model("Student", {
  name: String,
  studentId: String,
  class: String
});

// API GET
app.get("/students", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// API POST
app.post("/students", async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.json(newStudent);
});

// health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// about (BẮT BUỘC ĐỀ BÀI)
app.get("/about", (req, res) => {
  res.json({
    name: "Le Ngoc Anh",
    studentId: "2251220067",
    class: "22CT2"
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);