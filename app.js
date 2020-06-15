//npm install ejs express body-parser mongoose method-override express-sanitizer
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

//Connect to Local DB
var mongoDB = "mongodb://127.0.0.1:27017/findmy-pet";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Set view engine to EJS
app.set("view engine", "ejs");

//Allow ejs to see the public directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//Models
var Notice = require("./models/notice.js");

//Routes
var generalRoutes = require("./routes/general-routes.js");
app.use(generalRoutes);

var noticeRoutes = require("./routes/notice-routes.js");
app.use(noticeRoutes);

var commentRoutes = require("./routes/comment-routes.js")
app.use(commentRoutes);

//404
app.get("*", function (req, res) {
  res.send("ERROR 404");
});

//Tell express to listen to requests on port 3000
app.listen(3000, process.env.IP, function () {
  console.log("Server started!");
});
