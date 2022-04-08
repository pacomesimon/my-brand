const mongoose = require("mongoose");


const schema = mongoose.Schema({
  articleID: String,
  email: String,
  likeBool: Boolean

});


module.exports = mongoose.model("Like", schema);
