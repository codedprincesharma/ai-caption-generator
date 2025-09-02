const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const createPostController = require('../controllers/post.controller')
const multer = require('multer')
const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })

// protected Route
router.post('/',
  authMiddleware,
  upload.single("image"),
  createPostController
)

module.exports = router

