var mongoose = require("mongoose");

//Create Schema
var noticeSchema = new mongoose.Schema({
  petName: String,
  species: String,
  images: [String],
  body: String,
  reward: String,
  created: { type: Date, default: Date.now },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

//Create model
var Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
