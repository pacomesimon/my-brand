const mongoose = require("mongoose");


const schema = mongoose.Schema({

  name: String,
  email: String,
  queryBody: String

});


module.exports = mongoose.model("Query", schema);
