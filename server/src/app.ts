import express, { Application } from "express"
require('dotenv').config()
// import morgan from 'morgan'
const app: Application = express()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'

// regular middleware
app.use(express.json())
// app.use(cors())
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true

}))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// cookie middleware
app.use(cookieParser())

// morgan middleware
// app.use(morgan(':id :method :url :response-time'))

// import all routes here
const home = require('./routes/home')
const user = require('./routes/user')

// router middleware
app.use('/api/v1/', home)
app.use('/api/v1/', user)

module.exports = app