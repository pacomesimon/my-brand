import express from "express";
import articleController from "./controllers/articleController";
import queryController from "./controllers/queryController";
import commentController from "./controllers/commentController";
import likeController from "./controllers/likeController";
import userController from "./controllers/userController";
const router = express.Router();
import schemas from './validation/schemas'; 
import middleware from './validation/middleware'; 
import auth from './authentication/auth';


///////////////////////////////////////////////////////////////////////////////////////////

router.post("/signin", middleware(schemas.userSignin) , userController.post);
router.post("/signup", middleware(schemas.user) , userController.postSignup);
router.patch("/promote/:id", auth , userController.promote);
router.patch("/changecreds/:id", auth , userController.patch);
router.delete("/deleteuser/:id", auth , userController.delete);
router.get("/users/:id", userController.getOne);
router.get("/users/", auth , userController.getAll);

//////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

router.get("/queries", auth, queryController.getAll);
router.post("/queries", auth, middleware(schemas.query) , queryController.post);
router.delete("/queries/:id", auth, queryController.delete);

//////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

router.get("/articles", articleController.getAll);
router.post("/articles",auth , middleware(schemas.article) , articleController.post);
router.get("/articles/:id", articleController.getOne);
router.patch("/articles/:id",auth , middleware(schemas.articlePatch) , articleController.patch);
router.delete("/articles/:id",auth , articleController.delete);

//////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

router.get("/comments", commentController.getAll);
router.post("/comments",auth, middleware(schemas.comment) , commentController.post);
router.get("/comments/:id", commentController.getOne);  //this will route to ALL COMMENTS on the article associated with the ID.
router.delete("/comments/:id",auth, commentController.delete);

//////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

router.get("/likes",auth, likeController.getAll);
router.post("/likes",auth, middleware(schemas.like) , likeController.post);
router.get("/likes/:id",auth, likeController.getOne); //this will route to ALL LIKES on the article associated with the ID.
router.delete("/likes/:id",auth, likeController.delete);

//////////////////////////////////////////////////////////////////////////////////////////////


export default router;


