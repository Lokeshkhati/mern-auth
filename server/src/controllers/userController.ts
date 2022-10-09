import { Request, Response, NextFunction } from 'express';
const User = require('../models/user')
const CustomError = require('../utils/customError')
const cookieToken = require('../utils/cookieToken')
const mailHelper = require('../utils/emailHelper')

const crypto = require('crypto')

type RequestUserId = {
    user: {
        id: string
    }
}

exports.register = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body

    if (!email || !firstName || !lastName || !password) {
        return next(new CustomError('FirstName, LastName, Email and Password are required', 400))
    }
    try {
        // const UserExists = await User.findOne({ email })
        // if (UserExists) {
        //     return next(new CustomError("User with given email already exists"))
        // }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password
        })
        cookieToken(user, res)

    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    // check for presence of email and password
    if (!email || !password) {
        return next(new CustomError('please provide email and password', 400))
    }

    try {
        // get user from DB
        const user = await User.findOne({ email, }).select("+password")
        // if User not found in DB
        if (!user) {
            return next(new CustomError('You are not registerd', 400))
        }
        // Match the password
        const isPasswordCorrect = await user.isValidatedPassword(password)

        // if password do not match
        if (!isPasswordCorrect) {
            return next(new CustomError('Email or Password does not match or exist', 400))
        }

        // if all goes well we send the token
        cookieToken(user, res)
    } catch (error) {
        console.log(error)
    }
}

exports.logout = async (req: Request, res: Response) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logout success"
    })
}


exports.forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        return next(new CustomError('Email not found as registered', 400))
    }
    const forgotPasswordToken = user.getForgotPasswordToken()
    await user.save({ validateBeforeSave: false })

    const resetUrl = `https://mern-auth-seven.vercel.app/resetpassword/${forgotPasswordToken}`

    // `Copy paste this link in your URL and hit Enter\n\n${resetUrl}`
    const message =
        ` You have requested for a password reset\n\n
    Please go through this link to reset your  password.\n\n
    ${resetUrl}`


    try {
        await mailHelper({
            email: user.email,
            subject: "Password reset request",
            message
        })

        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        })

    } catch (error: any) {

        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined
        await user.save({ validateBeforeSave: false })

        return next(new CustomError(error.message, 500))
    }

}


exports.resetPassword = async (req: Request, res: Response, next: NextFunction) => {

    // grab token
    const resetToken = req.params.id
    console.log(resetToken)

    // encrypt the token
    const encryptedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    try {
        // find User using encryptedToken and expiry time
        const user = await User.findOne({
            encryptedToken, forgotPasswordExpiry: ({
                $gt: Date.now()
            })
        })
        if (!user) {
            return next(new CustomError("Token is invalid or expired", 400))
        }
        const { password, confirmPassword } = req.body

        // if (req.body.password !== req.body.confirmPassword) {
        //     return next(new CustomError("Password and Confirm password do not match"))
        // }
        if (password !== confirmPassword) {
            return next(new CustomError("Password and Confirm password do not match"))
        }

        user.password = password
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined

        await user.save()

        // send the token to frontend
        cookieToken(user, res)

    } catch (error) {
        next(error)
    }
}

exports.getLoggedInUserDetails = async (req: RequestUserId, res: Response, next: NextFunction) => {

    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
}


