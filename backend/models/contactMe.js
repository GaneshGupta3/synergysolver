const mongoose = require("mongoose");

const ContactMeSchema = new mongoose.Schema(
    {
        name : {
            type: String, 
            require: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
        },
        purpose:{
            type: String,
            required: true,
        },
        subject:{
            type: String,
            required: true,
        },
        message:{
            type: String,
            required: true,
        },
    } , {timestamps: true}
)

const ContactMe = mongoose.model("ContactMe" , ContactMeSchema);
module.exports = ContactMe;