const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const loginController = async(req ,res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true in production (requires HTTPS)
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({
        message: "Login successful!",
        user: { email: user.email, username: user.username },
    });
}

const registerController = async(req ,res)=>{
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const isUsernamePresent = await User.findOne({ username });
        if (isUsernamePresent) {
            return res.status(400).json({ message: "UserName already exists" });
        }
    
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "email already exists" });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword , profilePic:"" });
        
        // Save the new user
        await newUser.save();
    
        res.json({ message: "User registered successfully!" });
    
    } catch (err) {
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
}

const logoutController = (req , res)=>{
    res.clearCookie("token", { path: "/" });
    res.json({ message: "Cookie deleted successfully" });
}

module.exports = {loginController , registerController,logoutController};