const express = require("express");
const jwtAuth = require("../middlewares/jwtAuth");
const { updateProfileController , checkAuthController, getUserForSidebars , getMessages } = require("../controllers/userControllers");
const UserRouter = express.Router();

UserRouter.put("/update-profile-pic" ,jwtAuth , updateProfileController);

UserRouter.get("/check-auth" , jwtAuth , checkAuthController);

module.exports = UserRouter;