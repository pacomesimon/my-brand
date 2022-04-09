import express from "express";
import articleController from "./controllers/articleController";
import queryController from "./controllers/queryController";
import commentController from "./controllers/commentController";
import likeController from "./controllers/likeController";
const router = express.Router();
import schemas from './validation/schemas'; 
import middleware from './validation/middleware'; 

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
router.get("/comments/:id", commentController.getOne);  //this will route to ALL COMMENTS on the article associated with the ID.
router.delete("/comments/:id", commentController.delete);

//////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////

router.get("/likes", likeController.getAll);
router.post("/likes", middleware(schemas.like) , likeController.post);
router.get("/likes/:id", likeController.getOne); //this will route to ALL LIKES on the article associated with the ID.
router.delete("/likes/:id", likeController.delete);

//////////////////////////////////////////////////////////////////////////////////////////////


export default router;


