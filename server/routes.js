const express = require("express");
const articleController = require("./controllers/articleController");
const queryController = require("./controllers/queryController");
const commentController = require("./controllers/commentController");
const likeController = require("./controllers/likeController");
const router = express.Router();
const schemas = require('./validation/schemas'); 
const middleware = require('./validation/middleware'); 

///////////////////////////////////////////////////////////////////////////////////////////

router.get("/queries", queryController.getAll);

router.post("/queries", middleware(schemas.query) , queryController.post);

router.delete("/queries/:id", queryController.delete);

//////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////

router.get("/articles", articleController.getAll);

router.post("/articles", middleware(schemas.article) , articleController.post);

router.get("/articles/:id", articleController.getOne);

router.patch("/articles/:id", middleware(schemas.article) , articleController.patch);

router.delete("/articles/:id", articleController.delete);

//////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////

router.get("/comments", commentController.getAll);

router.post("/comments", middleware(schemas.comment) , commentController.post);

router.get("/comments/:id", commentController.getOne);

router.delete("/comments/:id", commentController.delete);

//////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////

router.get("/likes", likeController.getAll);

router.post("/likes", middleware(schemas.like) , likeController.post);

router.get("/likes/:id", likeController.getOne);

router.delete("/likes/:id", likeController.delete);

//////////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;


