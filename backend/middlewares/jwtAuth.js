const jwt = require('jsonwebtoken');
const User = require('../models/user.js')

const jwtAuth = async (req, res, next) => {
    try {

        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        req.userId = payload.id;

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Unauthorized:", error.message);
        return res.status(401).json({ message: error.message });
    }
};

module.exports = jwtAuth;