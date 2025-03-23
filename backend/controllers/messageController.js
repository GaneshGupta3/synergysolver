const Message = require("../models/message");
const User = require("../models/user");
const {} = require("../services/cloudinary");

const getUserForSidebars = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const user = await User.findById(loggedInUserId).populate("contacts");
        if (!user.contact) {
            return res.json({ message: "no contacts" });
        }
        res.status(200).json(user.contact);
    } catch (error) {
        console.log("error from getUserSidebars");
        res.status(500).json({ message: "internal server error" });
    }
};

const getMessages = () => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json({
            messages,
        });
    } catch (error) {
        res.status(500).json({ message: "error for fetching messages" });
        console.error("getting messages in server Error:", error);
    }
};

const sendMessage = async () => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageURL;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageURL,
        });

        await newMessage.save();

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("error : ", error.message);
        res.status(500).json({"message" : "message is not sent"});
    }
};

module.exports = {
    getUserForSidebars,
    getMessages,
    sendMessage,
};
