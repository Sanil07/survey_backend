const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config(); // Correct way for CommonJS
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const surveyRoutes = require("./routes/surveyRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON
app.use(cors()); // Enable CORS

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/survey",surveyRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Survey Form Backend is Running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
