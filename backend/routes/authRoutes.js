const express = require("express");
const jwtAuth = require("../middlewares/jwtAuth");
const { loginController, registerController, logoutController } = require("../controllers/authControllers.js");
const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/login" , loginController);
AuthenticationRouter.post("/register" , registerController);
AuthenticationRouter.post("/logout" , jwtAuth , logoutController);


module.exports = AuthenticationRouter;