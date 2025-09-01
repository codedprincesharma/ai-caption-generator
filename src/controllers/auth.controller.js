const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

// REGISTER
async function registerController(req, res) {
  try {
    const { username, password } = req.body;

    // check if user already exists
    const userExist = await userModel.findOne({ username });
    if (userExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    // create new user
    const user = await userModel.create({
      username,
      password: await bcrypt.hash(password, 10)
    });

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // set cookie
    res.cookie("token", token, { expiresIn:"1d" });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

// LOGIN
async function loginController(req, res) {
  try {
    const { username, password } = req.body;
    // find user
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong password!!" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // set cookie
    res.cookie("token", token);

    res.status(200).json({
      message: "User login successfully",
      id: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}
//
module.exports = { registerController, loginController };