import mongoose from "mongoose";


const schema = mongoose.Schema({

  title: String,
  previewImageURL: String,
  articleBody: String,
  authorID: String,
  date: String,
  subject: String,
  readingTime: String,

});


export default mongoose.model("Article", schema);
