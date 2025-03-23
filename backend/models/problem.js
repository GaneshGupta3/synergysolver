const mongoose = require('mongoose');
const User = require("./user")

const ProblemSchema = new mongoose.Schema({
    problemStatement: {
        type: String,
        required: true,
        trim: true, // Removes leading/trailing spaces
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
    difficulty: {
        type: String,
        required: true,
        enum: ["Easy", "Medium", "Hard"],
        message: "Difficulty must be Easy, Medium, or Hard",
    },    
    githubLink: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/i.test(v);
            },
            message: "Invalid GitHub link!",
        },
    },
    goodies: {
        type: String,
        default: null,
    },    
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
        },
    ],
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the user who issued the problem
        required: true, // Ensures every problem has an issuer
    },
    deadline: {
        type: Date,
        default: 0, // Ensures the problem has a deadline
    },
    solved: {
        type: Boolean,
        default: false,
        index: true, // Optimizes queries for solved problems
    },
}, { timestamps: true }); // Adds createdAt and updatedAt

const Problem = mongoose.model("Problem", ProblemSchema);

module.exports = Problem;
