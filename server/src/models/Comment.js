import mongoose from "mongoose";


const schema = mongoose.Schema({
  articleID: String,
  name: String,
  email: String,
  commentBody: String

});


export default mongoose.model("Comment", schema);
