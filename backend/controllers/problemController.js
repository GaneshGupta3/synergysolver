const Problem = require("../models/problem");
const User = require("../models/user");

const findProblemWithValidation = async (problemId, res) => {
    const problem = await Problem.findById(problemId);
    if (!problem) {
        res.status(404).json({ success: false, message: "Problem not found" });
        return null;
    }
    return problem;
};

const findUserWithValidation = async (userId, res) => {
    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return null;
    }
    return user;
};

const issueProblem = async (req, res) => {
    try {
        const {
            problemStatement,
            difficulty,
            tags,
            githubLink,
            goodies,
            deadline,
        } = req.body;

        const issuedBy = req.user._id; // assuming req.user is populated by auth middleware

        if (!problemStatement || !difficulty || !githubLink || !deadline) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Create a new problem instance
        const newProblem = new Problem({
            problemStatement,
            difficulty,
            issuedBy,
            tags,
            githubLink,
            goodies,
            deadline,
        });

        // Save to database
        const savedProblem = await newProblem.save();

        const user = await User.findById(issuedBy);

        user.issuedProblems.push({
            problemId: savedProblem._id,
            solved: false,
        });

        await user.save();

        res.status(201).json({
            message: "Problem issued successfully",
            problem: savedProblem,
        });
    } catch (error) {
        console.error("Error issuing problem:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const addMultipleProblems = async (req, res) => {
    try {
        const problems = req.body; // expecting an array of problems
        const issuedBy = req.user; // from auth middleware

        // Add issuedBy to each problem
        const problemsWithIssuer = problems.map((problem) => ({
            ...problem,
            issuedBy,
        }));

        const insertedProblems = await Problem.insertMany(problemsWithIssuer);

        const user = await User.findById(issuedBy._id);
        insertedProblems.forEach((problem) => {
            user.issuedProblems.push({
                problemId: problem._id,
                solved: false,
            });
        });
        await user.save();
        res.status(201).json({
            message: "Problems added successfully",
            data: {
                insertedProblems: insertedProblems,
                user: user,
            },
        });
    } catch (error) {
        console.error("Error adding multiple problems:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find()
            .populate("issuedBy", "username email") // optional: populate user info
            .sort({ createdAt: -1 }); // latest first

        res.status(200).json({
            success: true,
            count: problems.length,
            data: { problems: problems, user: req.user },
        });
    } catch (error) {
        console.error("Error fetching problems:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const attemptProblem = async (req, res) => {
    //params : problemId
    try {
        const { problemId } = req.params; // assuming problemId is passed in the URL
        const userId = req.user._id; // assuming req.user is populated by auth middleware
        const problem = await findProblemWithValidation(problemId, res);
        problem.accessPending.push({ solverId: userId });
        await problem.save();

        const user = await findUserWithValidation(userId, res);
        user.solvingProblems.push({ problemId });
        await user.save();
        await problem.populate("issuedBy", "username email _id");
        await problem.populate("accessPending.solverId", "username email _id");
        await problem.populate("attempters.userId", "username email _id");

        return res.status(200).json({
            success: true,
            message: "Problem attempted successfully",
            data: {
                problem,
                user,
            },
        });
    } catch (error) {
        console.error("Error attempting problem:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const grantAccess = async (req, res) => {
    try {
        const { attempterId } = req.body; // ID of the user to whom access is granted
        const { problemId } = req.params;
        const issuerId = req.user._id;
        const problem = await Problem.findById(problemId);
        if (problem.issuedBy.toString() !== issuerId.toString()) {
            return res.status(404).json({
                success: false,
                message: "you are not authorized to grant the access",
            });
        }

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        problem.accessPending = problem.accessPending.filter(
            (p) => p.solverId.toString() !== attempterId
        );

        problem.attempters.push({ userId: attempterId, solved: false });
        await problem.save();

        const attempter = await User.findById(attempterId);
        if (!attempter) {
            return res.status(404).json({
                success: false,
                message: "Attempter not found",
            });
        }
        attempter.solvingProblems.find(
            (p) => p.problemId.toString() === problemId.toString()
        ).granted = true;
        await attempter.save();

        return res.status(200).json({
            success: true,
            message: "Access granted successfully",
            data: {
                problem,
                attempter,
            },
        });
    } catch (error) {
        console.error("Error granting access:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getSpecificProblem = async (req, res) => {
    try {
        const { problemId } = req.params;
        const problem = await Problem.findById(problemId)
            .populate("issuedBy", "username , email")
            .populate("accessPending.solverId", "username email _id")
            .populate("attempters.userId", "username email _id");
        return res.status(200).json({
            success: true,
            data: { problem: problem, user: req.user },
        });
    } catch (error) {
        console.error("Error fetching specific problem:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getUnsolvedProblems = async (req, res) => {
    try {
        const problems = await Problem.find({ solved: false })
            .populate("issuedBy", "name email") // optional: populate user info
            .sort({ createdAt: -1 }); // latest first

        res.status(200).json({
            success: true,
            count: problems.length,
            data: problems,
        });
    } catch (error) {
        console.error("Error fetching unsolved problems:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const grantSolution = async (req, res) => {
    try {
        const { problemId } = req.params;
        const userId = req.user._id;
        const { attempterId } = req.body;

        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        if (problem.issuedBy.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to grant solved status",
            });
        }

        // Mark attempter as solved
        const attempterEntry = problem.attempters.find(
            (a) => a.userId.toString() === attempterId.toString()
        );

        if (!attempterEntry) {
            return res.status(404).json({
                success: false,
                message: "Attempter not found in problem's attempters list",
            });
        }

        attempterEntry.solved = true;
        problem.solved = true;
        problem.deadline = 0;

        // Update attempter's User model
        const attempter = await User.findById(attempterId);
        if (!attempter) {
            return res
                .status(404)
                .json({ success: false, message: "Attempter not found" });
        }

        const attempterProblemEntry = attempter.solvingProblems.find(
            (p) => p.problemId.toString() === problemId.toString()
        );

        if (attempterProblemEntry) {
            attempterProblemEntry.solved = true;
        }

        // Update issuer's User model
        const issuer = await User.findById(userId);
        if (!issuer) {
            return res
                .status(404)
                .json({ success: false, message: "Issuer not found" });
        }

        const issuerProblemEntry = issuer.issuedProblems.find(
            (p) => p.problemId.toString() === problemId.toString()
        );

        if (issuerProblemEntry) {
            issuerProblemEntry.solved = true;
        }

        // Save all
        await Promise.all([problem.save(), attempter.save(), issuer.save()]);

        return res.status(200).json({
            success: true,
            message: "Problem marked as solved successfully",
            data: {
                problem,
                attempter,
                issuer,
            },
        });
    } catch (error) {
        console.error("Error granting solved status:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const acceptRequest = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { attempterId } = req.body; // ID of the user to whom access is granted

        const problem = await findProblemWithValidation(problemId, res);

        problem.accessPending = problem.accessPending.filter(
            (p) => p.solverId.toString() !== attempterId
        );

        problem.attempters.push({ userId: attempterId, solved: false });
        await problem.save();

        const attempter = await findUserWithValidation(attempterId, res);

        attempter.solvingProblems.find(
            (p) => p.problemId.toString() === problemId.toString()
        ).granted = true;
        await attempter.save();
        
        await problem.populate("issuedBy", "username email _id");
        await problem.populate("accessPending.solverId", "username email _id");
        await problem.populate("attempters.userId", "username email _id");
        return res.status(200).json({
            success: true,
            message: "Access granted successfully",
            data: {
                problem,
                attempter,
            },
        });
    } catch (error) {
        console.error("Error accepting request:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    issueProblem,
    getAllProblems,
    addMultipleProblems,
    attemptProblem,
    getSpecificProblem,
    getUnsolvedProblems,
    grantSolution,
    acceptRequest,
};
