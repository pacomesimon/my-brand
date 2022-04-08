import mongoose from "mongoose";


const schema = mongoose.Schema({

  name: String,
  email: String,
  queryBody: String

});


export default mongoose.model("Query", schema);
