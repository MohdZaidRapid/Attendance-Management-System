const express = require("express");
require("./db/mongoose");
const Principle = require("./models/principle");
const Teacher = require("./models/teacher");
const Student = require("./models/student");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/principle", async (req, res) => {
  const principle = await new Principle(req.body);
  try {
    await principle.save();
    res.status(201).send(principle);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

app.post("/teacher", async (req, res) => {
  const teacher = await new Teacher(req.body);
  try {
    await teacher.save();
    res.status(201).send(teacher);
  } catch (error) {
    res.status(400).send("Bad Request");
  }
});

app.post("/student", async (req, res) => {
  const student = await new Student(req.body);
  try {
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send("Bad Request");
  }
});

app.get("/principle", async (req, res) => {
  const priciple = await Principle.find();
  try {
    res.status(200).send(priciple);
  } catch (error) {
    res.status(400).send("Not Found");
  }
});

app.get("/student", async (req, res) => {
  const students = await Student.find();
  try {
    res.status(200).send(students);
  } catch (error) {
    res.status(400).send("Not Found");
  }
});

app.get("/teacher", async (req, res) => {
  const teachers = await Teacher.find();
  try {
    res.status(200).send(teachers);
  } catch (error) {
    res.status(400).send("Not Found");
  }
});

app.get("/teacher/priciple", async (req, res) => {
  const teachers = await Teacher.find().populate("principleId");
  try {
    res.status(200).send(teachers);
  } catch (error) {
    res.status(400).send("Not Found");
  }
});

app.get("/student/priciple", async (req, res) => {
  const teachers = await Student.find().populate("principleId");
  try {
    res.status(200).send(teachers);
  } catch (error) {
    res.status(400).send("Not Found");
  }
});

app.get("/student/teacher", async (req, res) => {
  const teachers = await Student.find().populate("teacherId");
  try {
    res.status(200).send(teachers);
  } catch (error) {
    res.status(400).send("Not Found");
  }
});
// 62f2221dd6ac1f5fa4134a78
// 62f22228d6ac1f5fa4134a7a

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
