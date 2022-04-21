"use strict";

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_fs.default.copyFile("./src/test/README.md", "./README.md", err => {
  if (err) {
    console.log("\n README FILE COPYING Error Found:", err);
  } else {
    console.log("\n README FILE INITIALIZED");
  }
});