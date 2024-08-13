const { faker, ne } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const methodOverride = require("method-override");
const ejs = require("ejs");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
const getUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "mysql@3t",
});

app.get("/", (req, res) => {
  const query = "select count(*) from user";
  try {
    connection.query(query, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("./home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.status(505).send("Internal Server Error!");
  } finally {
    // connection.end();
  }
});

app.get("/user", (req, res) => {
  const query = "select id, username, email from user";
  try {
    connection.query(query, (err, result) => {
      if (err) throw err;
      res.render("./user.ejs", { users: result });
    });
  } catch (err) {
    console.log(err);
    res.status(505).send("Internal Server Error!");
  }
});

app.get("/user/:id/edit", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const query = "select username from user where id = ?";
  try {
    connection.query(query, [id], (err, result) => {
      if (err) throw err;
      res.render("./edit.ejs", { id, username: result[0]["username"] });
    });
  } catch (err) {
    console.log(err);
    res.status(505).send("Internal Server Error!");
  }
});

app.patch("/user/:id/edit", (req, res) => {
  const { id } = req.params;
  const { cur_pass, new_pass } = req.body;

  let query = "SELECT password FROM user WHERE id = ?";

  try {
    // Check the current password
    connection.query(query, [id], (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        return res.status(404).send("User not found");
      }

      const storedPassword = result[0].password;

      // Compare the stored password with the provided current password
      if (storedPassword !== cur_pass) {
        return res.status(401).send("Invalid password!");
      }

      // Update the password in the database
      query = "UPDATE user SET password = ? WHERE id = ?";
      connection.query(query, [new_pass, id], (err, result) => {
        if (err) throw err;

        // Redirect after successful password update
        res.redirect("/user");
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error!");
  }
});

app.listen(PORT, () => {
  console.log(`listneing at ${PORT}`);
});
