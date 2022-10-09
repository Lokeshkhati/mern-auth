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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        maxlength: [30, "First Name should be under 30 charactrs"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide a last name"],
        maxlength: [30, "Last Name should be under 30 char."]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        validator: [validator_1.default.isEmail, 'Please enter email in correct format'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password should be atleast 6 char."],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
// encrypt password before save - HOOKS
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!this.isModified('password'))
                return next();
            this.password = yield bcrypt.hash(this.password, 10);
        }
        catch (error) {
        }
    });
});
// validate the password with passed on user password
userSchema.methods.isValidatedPassword = function (usersendPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(usersendPassword, this.password);
    });
};
// create and return jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    });
};
// generate forgot password  token (string)
userSchema.methods.getForgotPasswordToken = function () {
    // generate a long and random string
    const forgotToken = crypto.randomBytes(16).toString('base64');
    // getting a hash - make sure to get a hash on backend
    this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest('hex');
    // time of token
    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;
    return forgotToken;
};
module.exports = mongoose_1.default.model('User', userSchema);
