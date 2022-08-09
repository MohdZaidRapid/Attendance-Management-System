const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  attendanceSchedule: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default:"student"
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher",
  },
  principleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Principle",
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
