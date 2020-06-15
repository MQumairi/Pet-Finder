var mongoose = require("mongoose");

//Create Schema
var commentSchema = new mongoose.Schema({
  author: String,
  body: String,
  created: { type: Date, default: Date.now },
});

//Create model
var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
