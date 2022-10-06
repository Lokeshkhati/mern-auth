"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('./app');
const connectWithDB = require('./config/db');
require('dotenv').config();
// connect with database
connectWithDB();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});
