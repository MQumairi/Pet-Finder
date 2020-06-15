var express = require("express");
var router = express.Router();

//Models
var Notice = require("../models/notice.js");

//Index
router.get("/notices", function (req, res) {
  Notice.find({}, function (err, foundObj) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log(foundObj);
      res.render("notices/index.ejs", { notices: foundObj });
    }
  });
});

//New
router.get("/notices/new", function (req, res) {
  res.render("notices/new.ejs");
});

//Create
router.post("/notices", function (req, res) {
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
    reward: req.body.notice.reward,
  };

  req.body.notice.img2
    ? newNotice.images.push(req.body.notice.img2)
    : console.log("no img2");
  req.body.notice.img3
    ? newNotice.images.push(req.body.notice.img3)
    : console.log("no img3");
  req.body.notice.img4
    ? newNotice.images.push(req.body.notice.img4)
    : console.log("no img4");

  Notice.create(newNotice, function (err, createdNotice) {
    if (err) {
      console.log("Error: " + error);
      res.render("new.ejs");
    } else {
      res.redirect("/notices");
    }
  });
});

//Single
router.get("/notices/:id", function (req, res) {
  Notice.findById(req.params.id).populate("comments").exec(function (err, foundNotice) {
    if (err) {
      console.log("Error: " + err);
      res.redirect("/notices");
    } else {
      res.render("notices/single.ejs", { notice: foundNotice });
    }
  });
});

module.exports = router;