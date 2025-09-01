const jwt = require("jsonwebtoken")
const userModel = require('../models/user.model')

async function authmiddleWare(req, res) {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({
      "message": "unauthrozed access , please login again"
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findOne({
      _id: decoded.id
    })
    req.user = user
  } catch (error) {
    return res.status(401).json({
      "message": "Invalid token , please login again",
      error,
    })
  }
}

module.exports = authmiddleWare