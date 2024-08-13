const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const PORT = 3000;

let posts = [
    {
        id: uuidv4(),
        username: "name",
        content: "hello world",
    },
];

const app = express();

app.set("view enjine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/posts", (req, res) => {
    res.render("./index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("./new.ejs");
});

app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find((post) => id === post.id);
    if (!post) res.send("404 not found");
    res.render("./edit.ejs", { posts });
});

app.post("/posts", (req, res) => {
    posts.push({ ...req.body, id: uuidv4() });
    res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    console.log(id, content);
    let found = false;
    posts.map((post) => {
        if (post.id === id) {
            found = true;
            post.content = content;
            res.redirect(`/posts`);
        }
    });
    if (!found) res.send("404 no post with such id found");
});
app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    let found = false;
    posts = posts.filter((post) =>post.id!=id);
    res.redirect('/posts');
});
app.listen(PORT, () => {
    console.log(`listning at ${PORT}`);
});
