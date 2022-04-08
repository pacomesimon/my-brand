const mongoose = require("mongoose");


const schema = mongoose.Schema({
  articleID: String,
  name: String,
  email: String,
  commentBody: String

});


module.exports = mongoose.model("Comment", schema);
