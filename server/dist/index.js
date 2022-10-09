"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app = require('./app');
const connectWithDB = require('./config/db');
(0, dotenv_1.config)();
connectWithDB();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});
