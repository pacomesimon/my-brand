import mongoose from "mongoose";
import config from "config";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({

  name: String,
  email: String,
  password: String,
  membership: String

});

schema.methods.generateAuthToken = function (){
  const token = jwt.sign({ _id: this._id,name: this.name, email: this.email, password: this.password, membership: this.membership}, config.get('jwtPrivateKey'));
  return token;
}

export default mongoose.model("User", schema);
