const express = require("express");
const app = express();
const PORT  = 3000;

app.get("/", (req, res)=>{
    res.send("welcome through get.");
});
app.get("/search", (req, res)=>{
    const {q, u} = req.query;
    res.send({q:q,u:u});
});
app.get("/:name", (req, res)=>{
    res.send(req.params.name);
});
app.get("*", (req, res)=>{
    res.status(404);
    res.send("not found");
});
app.listen(PORT, ()=>{
    console.log(`server running at PORT: ${PORT}`);
});