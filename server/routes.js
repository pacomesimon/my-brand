const express = require("express");
const postController = require("./controllers/postController");
const router = express.Router();
const schemas = require('./validation/schemas'); 
const middleware = require('./validation/middleware'); 

router.get("/posts", postController.getAll);

router.post("/posts", middleware(schemas.blogPOST) , postController.post);

router.get("/posts/:id", postController.getOne);

router.patch("/posts/:id", middleware(schemas.blogPOST) , postController.patch);

router.delete("/posts/:id", postController.delete);


module.exports = router;


