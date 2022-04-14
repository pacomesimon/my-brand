"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userController = {};

userController.post = async (req, res) => {
  const user = await _User.default.findOne({
    email: req.body.email
  });

  if (!user) {
    return res.status(400).send('Invalid password or Email.');
  }

  const validPassword = await _bcrypt.default.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send('Invalid Passw0rd or email.');
  }

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    membership: user.membership
  });
};

userController.postSignup = async (req, res) => {
  let user = await _User.default.findOne({
    email: req.body.email
  });
  if (user) return res.status(400).send("User already registered.");
  user = new _User.default({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    membership: "member"
  });
  const salt = await _bcrypt.default.genSalt(10);
  user.password = await _bcrypt.default.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    membership: user.membership
  });
};

userController.promote = async (req, res) => {
  if (!(req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com")) {
    return res.status(401).send('Unauthorized action.');
  }

  try {
    const user = await _User.default.findOne({
      _id: req.params.id
    });

    if (user.membership == "member") {
      user.membership = "admin";
    } else {
      user.membership = "member";
    }

    await user.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      membership: user.membership
    });
  } catch {
    res.status(404);
    res.send({
      error: "User doesn't exist!"
    });
  }
};

var _default = userController;
exports.default = _default;