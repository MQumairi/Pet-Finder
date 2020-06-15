var express = require("express");
var router = express.Router();

//Landing page
router.get("/", function (req, res) {
    res.redirect("/notices");
  });

module.exports = router;