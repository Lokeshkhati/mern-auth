const app = require('./app')
import { Server } from "http"
const connectWithDB = require('./config/db')
require('dotenv').config()

// connect with database
connectWithDB()

const server: Server = app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
})


