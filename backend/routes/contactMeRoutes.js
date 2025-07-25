const express = require("express");
const { sendMessage } = require("../controllers/contactMeController");
const ContactMeRouter = express.Router();

ContactMeRouter.post("/sendMessage" , sendMessage);


module.exports = ContactMeRouter;