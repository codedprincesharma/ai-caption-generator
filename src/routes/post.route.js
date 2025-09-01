const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
// const createPostController = require('../controllers/createPost.controller')

router.post('/', authMiddleware)

module.exports = router