const mongoose = require("mongoose");


const schema = mongoose.Schema({

  title: String,
  previewImageURL: String,
  articleBody: String

});


module.exports = mongoose.model("Article", schema);
