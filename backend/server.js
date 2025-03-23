const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Sample API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Vercel!" });
});

// Default route
app.get("/", (req, res) => {
  res.send("Server is running on Vercel");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; // Export for Vercel