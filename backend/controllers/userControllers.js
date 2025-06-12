const { default: mongoose } = require("mongoose");
const { default: Message } = require("../models/message");
const User = require("../models/user");
const cloudinary = require("../services/cloudinary");

const findUserWithValidation = async (userId, res) => {
    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return null;
    }
    return user;
};

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

const checkAuthController = async(req, res) => {
    try {
         const userId = req.user._id;
        const user = await User.findById(userId).select("-password").populate("solvingProblems.problemId").populate("issuedProblems.problemId");
        return res.status(200).json(user);
    } catch (error) {
        console.log("error in check auth controller");
        res.status(500).json({ message: "Internal server error" });
    }
};
const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const realUserId = req.user._id;

        const user = await User.findById(userId)
            .populate("contact")
            .populate({
                path: "issuedProblems.problemId",
                model: "Problem",
            })
            .populate({
                path: "solvingProblems.problemId",
                model: "Problem",
            });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (realUserId.toString() !== userId.toString()) {
            const realUser = await User.findById(realUserId);
            return res.status(200).json(user );
        }

        return res.status(200).json( user );
    } catch (error) {
        console.log("error in get user controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const editSkills = async (req, res) => {
    try {
        const { skills } = req.body;
        const userId = req.user._id;
        const user = await findUserWithValidation(userId, res);
        user.skills = skills;
        await user.save();
        res.status(200).json({
            message: "Skills added successfully",
            data: user,
        });
    } catch (error) {
        console.log("error in add skills controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const editPastProjects = async (req, res) => {
    try {
        const { pastProjects } = req.body;
        const userId = req.user._id;
        const user = await findUserWithValidation(userId, res);
        user.pastProjects = pastProjects;
        await user.save();
        res.status(200).json({
            message: "Past projects added successfully",
            data: user,
        });
    } catch (error) {
        console.log("error in add past projects controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const searchUsers = async ( req , res ) =>{
    try {
        const { searchQuery } = req.body;
        const users = await User.find({username : {$regex: searchQuery , $options: "i"}} , "username _id profilePic");
        res.status(200).json({ users: users });
    }
    catch (error) {
        console.log("error in get all usernames controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const uploadProfilePic = async (req, res) =>{
    const user = req.user;
    const { profilePicURL }  = req.body;
    if(!profilePicURL) {
        return res.status(400).json({ message: "Profile picture is required" });
    }
    if(!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.profilePic = profilePicURL;
    savedUser = await user.save();
    res.status(200).json( {savedUser} );
}

module.exports = {
    updateProfileController,
    checkAuthController,
    getUser,
    editSkills,
    editPastProjects,
    searchUsers,
    uploadProfilePic
};