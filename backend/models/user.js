const mongoose = require("mongoose");
const Problem = require("./problem");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            // required: true,
        },
        solvingProblems: [
            {
                problemId: {
                    type: mongoose.Types.ObjectId,
                    ref: "Problem",
                    required: true,
                },
                solved: {
                    type: Boolean,
                    default: false,
                },
                attemptedAt: {
                    type: Date,
                    default: Date.now, // Stores attempt time
                },
            },
        ],
        issuedProblems: [
            {
                problemId: {
                    type: mongoose.Types.ObjectId,
                    ref: "Problem",
                    required: true,
                },
                solved: {
                    type: Boolean,
                    default: false,
                },
                issuedAt: {
                    type: Date,
                    default: Date.now, // Stores attempt time
                },
            },
        ],
        contact : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // References other users in the system
            },
        ]
    },
    { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
