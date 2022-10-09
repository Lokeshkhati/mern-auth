"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { register, login, logout, forgotPassword, resetPassword, getLoggedInUserDetails, } = require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/user');
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:id').put(resetPassword);
router.route('/profile').get(isLoggedIn, getLoggedInUserDetails);
module.exports = router;
