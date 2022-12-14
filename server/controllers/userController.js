const mongoose = require("mongoose");
const User = require("../DataBase/User.model");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

//create a user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
  if (!emailRegex.test(email)) throw "Email is not supported from your domain.";
  if (password.length < 6) throw "Password must be atleast 6 characters long.";
  const userExists = await User.findOne({
    email,
  });
  if (userExists) throw "User with same email already exits.";
  const user = new User({
    name,
    email,
    password: sha256(password + process.env.SALT),
  });
  await user.save();
  res.json({
    message: "User [" + name + "] registered successfully!",
  });
};

//login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });
  if (!user) throw "Email and Password did not match.";
  const token = await jwt.sign({ id: user.id }, process.env.SECRET);
  res.json({
    message: "User logged in successfully!",
    token,
    userId: user.id,
  });
};

//ger all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

//all users without user connect
exports.getAllUsersMone = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.params.id } }).select("name");
  res.json(users);
};
