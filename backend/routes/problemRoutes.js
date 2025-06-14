const express = require("express");
const jwtAuth = require("../middlewares/jwtAuth");
const {
    issueProblem,
    getAllProblems,
    addMultipleProblems,
    attemptProblem,
    getSpecificProblem,
    getUnsolvedProblems,
    grantSolution,
    acceptRequest,
    rejectRequest,
    submitSolution,
} = require("../controllers/problemController");

const ProblemRouter = express.Router();

ProblemRouter.post("/issueProblem", jwtAuth, issueProblem);

ProblemRouter.get("/getAllProblems", jwtAuth, getAllProblems);

ProblemRouter.post("/issueMultipleProblem", jwtAuth, addMultipleProblems);

ProblemRouter.post("/attemptProblem/:problemId", jwtAuth, attemptProblem);

ProblemRouter.post("/acceptRequest/:problemId" , jwtAuth , acceptRequest);

ProblemRouter.post("/rejectRequest/:problemId" , jwtAuth , rejectRequest);

ProblemRouter.get("/getProblem/:problemId", jwtAuth, getSpecificProblem);

ProblemRouter.get("/getSolvedProblems", jwtAuth, getUnsolvedProblems);

ProblemRouter.post("/submitSolution/:problemId" , jwtAuth , submitSolution);

ProblemRouter.post("/grantSolution/:problemId", jwtAuth, grantSolution);

module.exports = ProblemRouter;