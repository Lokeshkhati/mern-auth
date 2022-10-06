import { Request, Response, NextFunction } from 'express';
const jwt = require("jsonwebtoken");
const User = require('../models/user')
const CustomError = require('../utils/customError')

interface UserRequest extends Request {
  user: string
}


exports.isLoggedIn = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token || req.headers['x-access-token'] || req.header("Authorization")?.replace("Bearer", "")

    if (!token) {
      return next(new CustomError("Login first to access this page", 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id)

    next();
  } catch (err) {
    res.status(400).json({ message: "unauthorised" });
  }
}
