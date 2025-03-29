const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//routers
const AuthenticationRouter = require("./routes/authRoutes");
const UserRouter = require("./routes/userRoutes");
const MessageRouter = require("./routes/messageRoutes");
const jwtAuth = require("./middlewares/jwtAuth");
const User = require("./models/user");

const app = express();
require("dotenv").config();
app.use(express.json());
// app.use(cors());
app.use(cookieParser());
app.use(cors());

// {
//   origin: *, // Allow both hosted & local frontend["https://synergysolver.vercel.app", "http://localhost:5173" , "http://localhost:5174"]
//   credentials: true, // Required for cookies & authentication
// }

app.get("/getDetails", (req, res) => {
    return res.json({
        activities: [
            {
                name: "Running",
                duration: 45, // in minutes
                caloriesBurned: 500,
                steps: 6000,
                distance: 5.2, // in km
            },
            {
                name: "Walking",
                duration: 30,
                caloriesBurned: 200,
                steps: 3500,
                distance: 2.8,
            },
        ],
        summary: {
            caloriesOut: 2800,
            activityCalories: 1200,
            caloriesBMR: 1600,
            activeScore: 85, // Assuming a score out of 100 based on activity level
            steps: 12000,
            sedentaryMinutes: 600, // 10 hours of inactivity
            lightlyActiveMinutes: 150, // 2.5 hours
            fairlyActiveMinutes: 90,
            veryActiveMinutes: 60,
            distances: [
                { activity: "total", distance: 8.0 },
                { activity: "tracker", distance: 7.5 },
                { activity: "sedentaryActive", distance: 0.5 },
                { activity: "lightlyActive", distance: 2.0 },
                { activity: "moderatelyActive", distance: 2.5 },
                { activity: "veryActive", distance: 3.0 },
                { activity: "loggedActivities", distance: 5.2 },
            ],
            marginalCalories: 500,
            heartRateZones: [
                { zone: "Resting", min: 50, max: 65, minutes: 600 },
                { zone: "Fat Burn", min: 70, max: 120, minutes: 90 },
                { zone: "Cardio", min: 120, max: 150, minutes: 45 },
                { zone: "Peak", min: 150, max: 180, minutes: 15 },
            ],
        },
        goals: {
            caloriesOut: 3000,
            steps: 15000,
            distance: 10,
            floors: 15,
            activeMinutes: 90,
        },
    });
});

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

app.get("/api/profile", jwtAuth, async (req, res) => {
    try {
        // Fetch user details from the database
        const user = await User.findById(req.userId).select("email username");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "Access Granted!",
            user: {
                email: user.email,
                username: user.username,
            },
        });
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

app.use("/auth", AuthenticationRouter);

app.use("/api/user", UserRouter);

app.use("/api/message", MessageRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app; // Export for Vercel
