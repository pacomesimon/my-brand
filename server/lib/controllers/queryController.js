"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _Query = _interopRequireDefault(require("../models/Query"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queryController = {};

queryController.getAll = async (req, res) => {
  const queries = await _Query.default.find();
  res.send(queries);
};

queryController.post = async (req, res) => {
  const query = new _Query.default({
    name: req.body.name,
    email: req.body.email,
    queryBody: req.body.queryBody
  });
  await query.save();
  res.send(query);
};

queryController.delete = async (req, res) => {
  try {
    await _Query.default.deleteOne({
      _id: req.params.id
    });
    res.status(204).send();
  } catch (_unused) {
    res.status(404);
    res.send({
      error: "Query doesn't exist!"
    });
  }
};

var _default = queryController;
exports.default = _default;