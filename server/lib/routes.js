"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _articleController = _interopRequireDefault(require("./controllers/articleController"));

var _queryController = _interopRequireDefault(require("./controllers/queryController"));

var _commentController = _interopRequireDefault(require("./controllers/commentController"));

var _likeController = _interopRequireDefault(require("./controllers/likeController"));

var _schemas = _interopRequireDefault(require("./validation/schemas"));

var _middleware = _interopRequireDefault(require("./validation/middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

///////////////////////////////////////////////////////////////////////////////////////////
router.get("/queries", _queryController.default.getAll);
router.post("/queries", (0, _middleware.default)(_schemas.default.query), _queryController.default.post);
router.delete("/queries/:id", _queryController.default.delete); //////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

router.get("/articles", _articleController.default.getAll);
router.post("/articles", (0, _middleware.default)(_schemas.default.article), _articleController.default.post);
router.get("/articles/:id", _articleController.default.getOne);
router.patch("/articles/:id", (0, _middleware.default)(_schemas.default.article), _articleController.default.patch);
router.delete("/articles/:id", _articleController.default.delete); //////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

router.get("/comments", _commentController.default.getAll);
router.post("/comments", (0, _middleware.default)(_schemas.default.comment), _commentController.default.post);
router.get("/comments/:id", _commentController.default.getOne); //this will route to ALL COMMENTS on the article associated with the ID.

router.delete("/comments/:id", _commentController.default.delete); //////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

router.get("/likes", _likeController.default.getAll);
router.post("/likes", (0, _middleware.default)(_schemas.default.like), _likeController.default.post);
router.get("/likes/:id", _likeController.default.getOne); //this will route to ALL LIKES on the article associated with the ID.

router.delete("/likes/:id", _likeController.default.delete); //////////////////////////////////////////////////////////////////////////////////////////////

var _default = router;
exports.default = _default;