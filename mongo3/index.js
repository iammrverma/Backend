const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("welcome"));

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});
app.get("/chat", async (req, res) => {
  res.render("chat.ejs");
});
app.post("/chat", async (req, res) => {
  console.log("post at chat");
  console.log(req.body);

  Chat.create({
    to: req.body.to,
    from: req.body.from,
    msg: req.body.message,
    createdAt: new Date(),
  })
    .then(() => {
      res.redirect("/chats");
    })
    .catch((err) => {
        console.log(err);
        res.status(505).send("An error occured we are working on it yet");
    });
});

app.listen(PORT, () => {
  console.log(`listing at ${PORT}`);
});

main()
  .then(() => console.log("connected to database !!!"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// const chat1 = new Chat({
//     from:"Raj",
//     to:"Raj",
//     msg:"hello world",
//     createdAt: new Date()
// });

// chat1.save().then((res)=>console.log(res)).catch(err => console.log(err));
