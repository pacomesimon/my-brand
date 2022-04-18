"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mongoose.connect(config.DBHost, { useNewUrlParser: true })
// .then(() => {
//     /* Drop the DB */
//     mongoose.connection.db.dropDatabase().then(() => {
//         console.log('database dropped!');
//         process.exit(0);
//     });
// });
(async () => {
  await _mongoose.default.connect(_config.default.DBHost, {
    useNewUrlParser: true
  });
  /* Drop the DB */

  await _mongoose.default.connection.db.dropDatabase();
  console.log('database dropped!');
  process.exit(0);
})();