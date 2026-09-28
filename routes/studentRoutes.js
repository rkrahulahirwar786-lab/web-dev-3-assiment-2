// routes/studentRoutes.js
// Modular routing for Student CRUD APIs (Express Router)

const express = require("express");
const router = express.Router();
const students = require("../data/students");

// Helper: generate next unique ID
const getNextId = () => {
  if (students.length === 0) return 1;
  return Math.max(...students.map((s) => s.id)) + 1;
};

// Helper: simple email format check
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// -------------------- GET /students --------------------
// Get all students
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// -------------------- GET /students/:id --------------------
// Get a single student by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid student ID" });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  res.status(200).json({ success: true, data: student });
});

// -------------------- POST /students --------------------
// Create a new student
router.post("/", (req, res) => {
  const { name, course, age, email, phone } = req.body;

  // Basic validation
  if (!name || !course) {
    return res.status(400).json({
      success: false,
      message: "Name and course are required fields",
    });
  }

  if (email && !isValidEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  if (phone && !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ success: false, message: "Phone must be a 10-digit number" });
  }

  const newStudent = {
    id: getNextId(),
    name,
    course,
    age: age || null,
    email: email || null,
    phone: phone || null,
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent,
  });
});

// -------------------- PUT /students/:id --------------------
// Update an existing student
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid student ID" });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  const { name, course, age, email, phone } = req.body;

  if (!name && !course && !age && !email && !phone) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one field (name, course, age, email, phone) to update",
    });
  }

  if (email && !isValidEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  if (phone && !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ success: false, message: "Phone must be a 10-digit number" });
  }

  if (name) student.name = name;
  if (course) student.course = course;
  if (age) student.age = age;
  if (email) student.email = email;
  if (phone) student.phone = phone;

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
});

// -------------------- DELETE /students/:id --------------------
// Delete a student
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid student ID" });
  }

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deletedStudent[0],
  });
});

module.exports = router;
