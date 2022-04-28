import mongoose from "mongoose";


const schema = mongoose.Schema({
  articleID: String,
  userID: String,

});


export default mongoose.model("Like", schema);
