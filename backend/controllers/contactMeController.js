const ContactMe = require("../models/contactMe");

const sendMessage = async (req, res) => {
    try {
        const { name, email, subject, message, purpose } = req.body;

        // Basic validation (optional, can be expanded)
        if (!name || !email || !subject || !message || !purpose) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create and save the new contact message
        const newMessage = new ContactMe({
            name,
            email,
            subject,
            message,
            purpose
        });

        await newMessage.save();

        res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error while submitting:", error.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { sendMessage };