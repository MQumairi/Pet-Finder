var express = require("express");
var router = express.Router();

//Models
var Notice = require("../models/notice.js");
var Comment = require("../models/comment.js");

router.get("/notices/:id/comments/new", function (req, res) {
  Notice.findById(req.params.id, function (err, foundObj) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log(foundObj);
      res.render("comments/new.ejs", { notice: foundObj });
    }
  });
});

//Ensure that the form's inputs have names in the format of blog[title], where blog is the name of the object
router.post("/notices/:id/comments", function (req, res) {
  //Santiize input fields
  req.body.comment.author = req.sanitize(req.body.comment.author);
  req.body.comment.body = req.sanitize(req.body.comment.body);

  Comment.create(req.body.comment, function (err, newComment) {
    if (err) {
      console.log("Error: " + error);
      res.render("new");
    } else {
      Notice.findById(req.params.id, function (err, foundObj) {
        if (err) {
          console.log("Error: " + err);
        } else {
          foundObj.comments.push(newComment);
          foundObj.save();
          res.redirect("/notices/" + req.params.id);
        }
      });
    }
  });
});

module.exports = router;
