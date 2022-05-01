import "core-js/stable";
import "regenerator-runtime/runtime";
import config from "config";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

//To configure the jwtPrivateKey, run this in your terminal:
//(for MAC or LINUX) $ export pacome_jwtPrivateKey=SECURE_KEY
//(for WINDOWS [CMD]) $ set pacome_jwtPrivateKey=SECURE_KEY
// where SECURE_KEY can be any string you want.

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.'); //to avoid the error, refer to the comments above this function definition.
  process.exit(1);
}

const port = process.env.PORT || 5000;

const app = express();
mongoose.connect(process.env.MONGODB_URI || config.DBHost, { useNewUrlParser: true })
  .then(() => {
    
    app.use(express.json());

    app.use("/api", routes);

    app.use("/swagger",express.static('swaggerDist')); // app will also (using path: ./swagger) serve static files in the mentioned folder (parameter)

    app.use("/tutorials",express.static('integrationTutorials'));

    app.use("/",express.static('UI'));

    app.use("/blogs/", express.static('UI/blogs'));
    
    app.listen(port, () => {
      console.log("Server has started!");
    });
    
  });

  export default app;
