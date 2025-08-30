const express = require('express')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth.route')

const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())

// auth API
app.use('/auth', authRoute)

module.exports = app
