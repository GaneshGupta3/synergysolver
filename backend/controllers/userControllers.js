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



module.exports = {
    updateProfileController,
    checkAuthController,
};
