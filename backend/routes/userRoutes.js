const express = require("express");
const jwtAuth = require("../middlewares/jwtAuth");
const { updateProfileController , checkAuthController, getUser, editSkills, editPastProjects } = require("../controllers/userControllers");
const UserRouter = express.Router();

UserRouter.put("/update-profile-pic" ,jwtAuth , updateProfileController);

UserRouter.get("/check-auth" , jwtAuth , checkAuthController);

UserRouter.get("/:userId" , jwtAuth , getUser);

UserRouter.post("/editSkills" , jwtAuth , editSkills);

UserRouter.post("/editPastProjects" , jwtAuth , editPastProjects);

module.exports = UserRouter;