const mongoose = require("mongoose");
const User = require("./user");

const ProblemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: false, // Ensures every problem has a title
            trim: true, // Removes leading/trailing spaces
        },
        problemStatement: {
            type: String,
            required: true,
            trim: true, // Removes leading/trailing spaces
        },
        issuedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the user who issued the problem
            required: true, // Ensures every problem has an issuer
        },
        difficulty: {
            type: String,
            required: true,
            enum: ["Easy", "Medium", "Hard"],
            message: "Difficulty must be Easy, Medium, or Hard",
        },
        tags: {
            type: [String],
            validate: {
                validator: function (tags) {
                    return new Set(tags).size === tags.length;
                },
                message: "Tags must be unique!",
            },
        },
        githubLink: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/i.test(
                        v
                    );
                },
                message: "Invalid GitHub link!",
            },
        },
        goodies: {
            type: String,
            default: null,
        },
        deadline: {
            type: Date,
            default: null, // Ensures the problem has a deadline
        },
        accessPending: [
            {
                solverId: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                // Detailed Explanation (can include diagrams, flowcharts, or steps)
                proposedSolution: {
                    type: String,
                    required: true,
                },
            },
        ],
        accessRejected: [
            {
                solverId: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                proposedSolution: {
                    type: String,
                    required: true,
                },
            },
        ],
        accessBlocked: [
            {
                solverId: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                proposedSolution: {
                    type: String,
                    required: false,
                },
            },
        ],
        attempters: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User", // Refers to User model
                    required: true,
                },
                solved: {
                    type: Boolean,
                    default: false, // Default: Not solved
                },
                proposedSolution: {
                    type: String,
                    required: false,
                },
            },
        ],
        solutions: [
            {
                solverId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                solutionVideoUrl: {
                    type: String,
                    required: true,
                },
                solutionText: {
                    type: String,
                    required: true,
                },
                accepted: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        solved: {
            type: Boolean,
            default: false,
            index: true,
        },
        solveBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        issuedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Problem = mongoose.model("Problem", ProblemSchema);

module.exports = Problem;
