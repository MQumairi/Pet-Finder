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

//Database Models
//Create Schema
var noticeSchema = new mongoose.Schema({
  petName: String,
  species: String,
  images: [String],
  body: String,
  reward: String,
  created: { type: Date, default: Date.now },
});

//Create model
var Notice = mongoose.model("Notice", noticeSchema);

//Seed schema
// var Absi = {
//   petName: "Absi",
//   species: "Cat",
//   images: ["/images/absi.jpg", "/images/absi2.jpg"],
//   body: "He's a cat",
//   reward: "1 Billion Dollars",
// };

// Notice.create(Absi, function (err, createdObj) {
//   if (err) {
//     console.log("Error: " + error);
//   } else {
//     console.log(createdObj);
//   }
// });

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
  Notice.find({}, function (err, foundObj) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log(foundObj);
      res.render("notices/index.ejs", { notices: foundObj });
    }
  });
});

//NEW
app.get("/notices/new", function (req, res) {
  res.render("notices/new.ejs");
});

//CREATE
app.post("/notices", function (req, res) {
  //Santiize all fields
  req.body.notice.petName = req.sanitize(req.body.notice.petName);
  req.body.notice.species = req.sanitize(req.body.notice.species);
  req.body.notice.img1 = req.sanitize(req.body.notice.img1);
  req.body.notice.img2 = req.sanitize(req.body.notice.img2);
  req.body.notice.img3 = req.sanitize(req.body.notice.img3);
  req.body.notice.img4 = req.sanitize(req.body.notice.img4);
  req.body.notice.body = req.sanitize(req.body.notice.body);
  req.body.notice.reward = req.sanitize(req.body.notice.reward);

  var newNotice = {
    petName: req.body.notice.petName,
    species: req.body.notice.species,
    images: [req.body.notice.img1],
    body: req.body.notice.body,
    reward: req.body.notice.reward
  }

  req.body.notice.img2 ? newNotice.images.push(req.body.notice.img2) : console.log("no img2");
  req.body.notice.img3 ? newNotice.images.push(req.body.notice.img3) : console.log("no img3");
  req.body.notice.img4 ? newNotice.images.push(req.body.notice.img4) : console.log("no img4");
  
  Notice.create(newNotice, function (err, createdNotice) {
    if (err) {
      console.log("Error: " + error);
      res.render("new.ejs");
    } else {
      res.redirect("/notices");
    }
  });
});

//SINGLE
app.get("/notices/:id", function (req, res) {
    Notice.findById(req.params.id, function (err, foundNotice) {
      if (err) {
        console.log("Error: " + err);
        res.redirect("/notices");
      } else {
        res.render("notices/single.ejs", { notice: foundNotice });
      }
    });
});

//404
app.get("*", function (req, res) {
  res.send("ERROR 404");
});

//Tell express to listen to requests on port 3000
app.listen(3000, process.env.IP, function () {
  console.log("Server started!");
});
