const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) =>{
    res.render("home");
});
app.get("/profile/:username", (req, res) =>{
    let { username } = req.params;
    const data = require('./data.json');
    let user = data[username];
    if (!user) {
        res.send("user not found");
        return ;
    }
    res.render("profile", { username, user } );
});
app.listen(PORT, ()=>{
    console.log(`listning at PORT ${PORT}`);
})