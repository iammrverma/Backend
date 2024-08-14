const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    from: {
        type: String,
        require: true,
    },
    to: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    createdAt: {
        type: Date,
        required: true
    }
}) ;

const Chat = new mongoose.model("Chat", chatSchema);

module.exports = Chat;