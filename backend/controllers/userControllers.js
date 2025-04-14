const { default: Message } = require("../models/message");
const User = require("../models/user");
const cloudinary = require("../services/cloudinary");

const updateProfileController = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
        if (!profilePic) {
            return res.status(400).json({ message: "profile pic is required" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("couldn't update profile picture");
        res.status(500).json({ message: "internal server error" });
    }
};

const checkAuthController = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in check auth controller");
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId)
            .populate("contact")
            .populate({
                path: "issuedProblems.problemId",
                model: "Problem"
            })
            .populate({
                path: "solvingProblems.problemId",
                model: "Problem"
            })
            

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ data: user });
    } catch (error) {
        console.log("error in get user controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
    updateProfileController,
    checkAuthController,
    getUser,
};
