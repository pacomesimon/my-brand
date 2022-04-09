import mongoose from "mongoose";


const schema = mongoose.Schema({

  title: String,
  previewImageURL: String,
  articleBody: String

});


export default mongoose.model("Article", schema);
