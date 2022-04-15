import mongoose from "mongoose";


const schema = mongoose.Schema({
  articleID: String,
  userID: String,
  name: String,
  commentBody: String

});


export default mongoose.model("Comment", schema);
