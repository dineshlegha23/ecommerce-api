const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { attachCookiesToResponse, createJWT } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new BadRequestError("Email already exists.");
  }
  const user = await User.create({ email, password, name });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(201).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(200).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.send("logout working");
};

module.exports = { register, login, logout };
