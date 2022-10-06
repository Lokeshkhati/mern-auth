"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
// regular middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// cookie middleware
app.use((0, cookie_parser_1.default)());
// morgan middleware
// app.use(morgan(':id :method :url :response-time'))
// import all routes here
const home = require('./routes/home');
const user = require('./routes/user');
// router middleware
app.use('/api/v1/', home);
app.use('/api/v1/', user);
module.exports = app;
