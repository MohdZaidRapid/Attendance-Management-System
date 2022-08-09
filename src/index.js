const express = require("express");
require("./db/mongoose");
const Principle = require("./models/principle");
const Teacher = require("./models/teacher");
const Student = require("./models/student");
const auth = require("./middleware/auth");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const principle = await new Principle(req.body);
  try {
    await principle.save();
    const token = await principle.getJWt();
    res.status(201).send(token);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// app.post("/principle", async (req, res) => {
//   const principle = await new Principle(req.body);
//   try {
//     await principle.save();
//     res.status(201).send(principle);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

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

app.get("/student", auth, async (req, res) => {
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

app.get("/teacher/principle", async (req, res) => {
  const teachers = await Teacher.find().populate("principleId");
  try {
    res.status(200).send(teachers);
  } catch (error) {
    res.status(400).send("Not Found");
  }
});

app.get("/student/principle", async (req, res) => {
  const teachers = await Student.find().populate("principleId");
  try {
    res.status(200).send(teachers);
  } catch (error) {
    res.status(400).send("Not Found");
  }
});

app.get("/student/teacher", async (req, res) => {
  const teachers = await Student.find({ attendanceSchedule: true }).populate(
    "teacherId",
    "name -_id"
  );

  try {
    res.status(200).send(teachers);
  } catch (error) {
    res.status(400).send("Not Found");
  }
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});

// {createdAt:{$gte:ISODate(“2020-03-01”),$lt:ISODate(“2021-04-01”)}}
// items.find({
//   created_at: {
//       $gte: ISODate("2010-04-29T00:00:00.000Z"),
//       $lt: ISODate("2010-05-01T00:00:00.000Z")
//   }
// })
