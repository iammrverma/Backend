const mongoose = require("mongoose");
const Chat = require('./models/chat');
main().then(() => console.log('connected to database !!!')).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

Chat.insertMany([
    {
        from: "Raj",
        to: "rakesh",
        msg: "hello rakesh",
        createdAt: new Date()
    },
    {
        from: "rakesh",
        to: "Raj",
        msg: "hi raj",
        createdAt: new Date()
    },
    {
        from: "Raj",
        to: "rakesh",
        msg: "kya kar rha h moviw chalega?",
        createdAt: new Date()
    },
    {
        from: "rakesh",
        to: "Raj",
        msg: "nhi yaar tu jaa",
        createdAt: new Date()
    },
    {
        from: "Raj",
        to: "sonakshi",
        msg: "movie chalegi",
        createdAt: new Date()
    },
    {
        from: "sonakshi",
        to: "Raj",
        msg: "ok milte h theater ke bhar 10 baje.",
        createdAt: new Date()
    },
]);

// chat1.save().then((res)=>console.log(res)).catch(err => console.log(err));