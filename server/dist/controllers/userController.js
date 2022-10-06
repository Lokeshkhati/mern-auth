"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/user');
const CustomError = require('../utils/customError');
const cookieToken = require('../utils/cookieToken');
exports.signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !firstName || !lastName || !password) {
        return next(new CustomError('FirstName, LastName, Email and Password are required', 400));
    }
    try {
        const user = yield User.create({
            firstName,
            lastName,
            email,
            password
        });
        cookieToken(user, res);
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // check for presence of email and password
    if (!email || !password) {
        return next(new CustomError('please provide email and password', 400));
    }
    try {
        // get user from DB
        const user = yield User.findOne({ email, }).select("+password");
        // if User not found in DB
        if (!user) {
            return next(new CustomError('You are not registerd', 400));
        }
        // Match the password
        const isPasswordCorrect = yield user.isValidatedPassword(password);
        // if password do not match
        if (!isPasswordCorrect) {
            return next(new CustomError('Email or Password does not match or exist', 400));
        }
        // if all goes well we send the token
        cookieToken(user, res);
    }
    catch (error) {
        console.log(error);
    }
});
exports.logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logout success"
    });
});
