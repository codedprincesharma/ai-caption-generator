const express = require('express')
const { registerController, loginController } = require('../controllers/auth.controller')

const router = express.Router()

// Register route
router.post('/register', registerController)
router.post('/login', loginController)

module.exports = router
