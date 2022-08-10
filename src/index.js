const express = require("express");
require("./db/mongoose");
const Principle = require("./models/principle");
const Teacher = require("./models/teacher");
const Student = require("./models/student");
const auth = require("./middleware/auth");
const restricts = require("./middleware/restrict").restricts;

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

app.post("/teacher", auth, async (req, res) => {
  const principleId = req.principle;

  const teacher = await new Teacher({
    name: req.body.name,
    attendanceTeacher: req.body.attendanceTeacher,
    createdAt: req.body.createdAt,
    principleId: principleId,
  });

  try {
    await teacher.save();
    res.status(201).send(teacher);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/student", auth, async (req, res) => {
  const principleId = req.body.principleId;
  const student = await new Student({
    name: req.body.name,
    attendanceStudent: req.body.attendanceStudent,
    createdAt: req.body.createdAt,
    teacherName: req.body.teacherName,
    principleId: principleId,
  });
  try {
    await student.save();
    res.status(201).send(student);
  } catch (e) {
    res.status(400).send(e);
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

app.get("/teacher", auth, restricts("principle"), async (req, res) => {
  const teachers = await Teacher.find();
  try {
    res.status(200).send(teachers);
  } catch (error) {
    res.status(400).send("Not Found");
  }
});

app.patch("/update/student/:id", auth, async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: false,
  });

  try {
    if (!student) {
      return res.status(400).send("No Student found with this id");
    }
    res.status(200).send(student);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// app.get("/teacher/student/:name", async (req, res) => {
//   const name1 = req.params.name;
//   const stundent = await Student.find({ teacherName: name1 });
//   try {
//     res.status(200).send(stundent);
//   } catch (error) {
//     res.status(400).send("Not Found");
//   }
// });

app.get("/teacher/students/:name/:attendance?", auth,async (req, res) => {
  const name1 = req.params.name;
  const attendance = req.params.attendance;
  let student;

  // const student = await Student.find({ teacherName: name1 }).find({
  //   attendanceStudent: attendance,
  // });
  if (req.params.attendance) {
    student = await Student.find({ teacherName: name1 }).find({
      attendanceStudent: attendance,
    });
  } else {
    student = await Student.find({ teacherName: name1 });
  }

  try {
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send("Not Found");
  }
});

// app.get("/student/principle", async (req, res) => {
//   const teachers = await Student.find().populate("principleId");
//   try {
//     res.status(200).send(teachers);
//   } catch (error) {
//     res.status(400).send("Not Found");
//   }
// });

// app.get("/student/teacher", async (req, res) => {
//   const teachers = await Student.find({ attendanceSchedule: true }).populate(
//     "teacherId",
//     "name -_id"
//   );

//   try {
//     res.status(200).send(teachers);
//   } catch (error) {
//     res.status(400).send("Not Found");
//   }
// });

// app.get("/studentdetails", auth, async (req, res) => {
//   const teachers = await Student.find({
//     principleId: req.principleId,
//   }).populate("teacherId", "name -_id");

//   try {
//     res.status(200).send(teachers);
//   } catch (error) {
//     res.status(400).send("Not Found");
//   }
// });

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
