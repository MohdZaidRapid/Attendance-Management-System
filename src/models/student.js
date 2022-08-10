const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  attendanceStudent: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "student",
  },
  createdAt: {
    type: Date,
  },
  teacherName: {
    type: String,
    required: true,
    ref: "Teacher",
  },
  principleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Principle",
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
