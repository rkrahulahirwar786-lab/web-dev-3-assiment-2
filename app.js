// app.js
// Main entry point — Express server setup

const express = require("express");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------- Global Middleware --------------------
app.use(express.json()); // parse JSON request bodies
app.use(logger); // custom logger middleware (logs method, URL, timestamp)

// -------------------- Routes --------------------
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Management REST API is running",
    endpoints: {
      getAll: "GET /students",
      getOne: "GET /students/:id",
      create: "POST /students",
      update: "PUT /students/:id",
      delete: "DELETE /students/:id",
    },
  });
});

app.use("/students", studentRoutes);

// -------------------- 404 Handler --------------------
// Runs when no route matches
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// -------------------- Global Error Handler --------------------
// Catches any unexpected errors thrown in routes/middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// -------------------- Start Server --------------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
