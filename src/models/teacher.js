const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  attendanceScheduleTeacher: [{ type: Boolean, default: false }],
  principleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Principle",
  },
});

const Student = mongoose.model("Teacher", teacherSchema);

module.exports = Student;
