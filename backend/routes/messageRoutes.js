const express = require("express");
const jwtAuth = require("../middlewares/jwtAuth");
const { getUserForSidebars , getMessages, sendMessage } = require("../controllers/messageController");
const MessageRouter = express.Router();

MessageRouter.get("/getContacts" , jwtAuth , getUserForSidebars);

MessageRouter.get("/:id" , jwtAuth , getMessages);

MessageRouter.post("/send" , jwtAuth , sendMessage);

module.exports = MessageRouter;