const User = require("../models/User");
const CustomError = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new CustomError.BadRequestError("Email already exists.");
  }
  const user = await User.create({ email, password, name });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });

  res.status(201).json({ user: tokenUser, token });
};

const login = async (req, res) => {
  res.send("login working");
};

const logout = async (req, res) => {
  res.send("logout working");
};

module.exports = { register, login, logout };
