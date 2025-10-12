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
const ProblemRouter = require("./routes/problemRoutes");
const ContactMeRouter = require("./routes/contactMeRoutes");

const app = express();
require("dotenv").config();
app.use(express.json());
// app.use(cors());
app.use(cookieParser());
app.use(
    cors({
        
        origin: [
            "https://synergysolver.vercel.app",
            "http://localhost:5173"
        ],
        credentials: true,
    })
);

// {
//   origin: *, // Allow both hosted & local frontend["https://synergysolver.vercel.app", "http://localhost:5173" , "http://localhost:5174"]
//   credentials: true, // Required for cookies & authentication
// }

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

app.use("/api/problem", ProblemRouter);

app.use("/api/message", MessageRouter);

app.use("/api/contactMe" , ContactMeRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app; // Export for Vercel