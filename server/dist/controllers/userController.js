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
const mailHelper = require('../utils/emailHelper');
const crypto = require('crypto');
exports.register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !firstName || !lastName || !password) {
        return next(new CustomError('FirstName, LastName, Email and Password are required', 400));
    }
    try {
        // const UserExists = await User.findOne({ email })
        // if (UserExists) {
        //     return next(new CustomError("User with given email already exists"))
        // }
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
exports.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logout success"
    });
});
exports.forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield User.findOne({ email });
    if (!user) {
        return next(new CustomError('Email not found as registered', 400));
    }
    const forgotPasswordToken = user.getForgotPasswordToken();
    yield user.save({ validateBeforeSave: false });
    const resetUrl = `http://localhost:3000/resetpassword/${forgotPasswordToken}`;
    // `Copy paste this link in your URL and hit Enter\n\n${resetUrl}`
    const message = ` You have requested for a password reset\n\n
    Please go through this link to reset your  password.\n\n
    ${resetUrl}`;
    try {
        yield mailHelper({
            email: user.email,
            subject: "Password reset request",
            message
        });
        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });
    }
    catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        yield user.save({ validateBeforeSave: false });
        return next(new CustomError(error.message, 500));
    }
});
exports.resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // grab token
    const resetToken = req.params.id;
    console.log(resetToken);
    // encrypt the token
    const encryptedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    try {
        // find User using encryptedToken and expiry time
        const user = yield User.findOne({
            encryptedToken, forgotPasswordExpiry: ({
                $gt: Date.now()
            })
        });
        if (!user) {
            return next(new CustomError("Token is invalid or expired", 400));
        }
        const { password, confirmPassword } = req.body;
        // if (req.body.password !== req.body.confirmPassword) {
        //     return next(new CustomError("Password and Confirm password do not match"))
        // }
        if (password !== confirmPassword) {
            return next(new CustomError("Password and Confirm password do not match"));
        }
        user.password = password;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        yield user.save();
        // send the token to frontend
        cookieToken(user, res);
    }
    catch (error) {
        next(error);
    }
});
exports.getLoggedInUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
});
