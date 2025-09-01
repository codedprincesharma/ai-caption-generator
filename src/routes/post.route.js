const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/', (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({
      "message": "unauthorized access, please login again"
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = userModel.findOne({
      id: decoded.id
    })
    req.user = user
  } catch (error) {
    return res.status(401).json({
      "message": "Invalid token , please login again ",
      error
    })
  }
})
















module.exports = router