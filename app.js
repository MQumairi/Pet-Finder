//npm install ejs express body-parser mongoose method-override express-sanitizer
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

//Set view engine to EJS
app.set("view engine", "ejs");

//Allow ejs to see the public directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//***********
//LANDING
//***********
app.get("/", function (req, res) {
  res.redirect("/notices");
});

//***********
//NOTICES
//***********

//INDEX
app.get("/notices", function (req, res) {
  res.render("notices/index.ejs");
});

//NEW
app.get("/notices/new", function (req, res) {
  res.render("notices/new.ejs");
});

//SINGLE
app.get("/notices/:id", function (req, res) {
    res.render("notices/single.ejs", {notice: req.params.id});
//   Blog.findById(req.params.id, function (err, foundBlog) {
//     if (err) {
//       console.log("Error: " + err);
//       res.redirect("/");
//     } else {
//       res.render("show", { blog: foundBlog });
//     }
//   });
});

//404
app.get("*", function (req, res) {
  res.send("ERROR 404");
});

//Tell express to listen to requests on port 3000
app.listen(3000, process.env.IP, function () {
  console.log("Server started!");
});
