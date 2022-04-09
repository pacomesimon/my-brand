import mongoose from "mongoose";


const schema = mongoose.Schema({
  articleID: String,
  email: String,
  likeBool: Boolean

});


export default mongoose.model("Like", schema);
