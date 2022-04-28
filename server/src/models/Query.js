import mongoose from "mongoose";


const schema = mongoose.Schema({
  userID: String,
  name: String,
  email: String,
  queryBody: String,
  date: String

});


export default mongoose.model("Query", schema);
