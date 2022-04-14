import "core-js/stable";
import "regenerator-runtime/runtime";
import config from "config";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
  .then(() => {
    const app = express();

    app.use(express.json());

    app.use("/api", routes);
    
    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });
