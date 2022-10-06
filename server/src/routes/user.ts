import express from 'express';
const router = express.Router()

const { register, login, logout, forgotPassword, resetPassword, getLoggedInUserDetails } = require('../controllers/userController')
const { isLoggedIn } = require('../middlewares/user')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:id').put(resetPassword)
router.route('/profile').get(isLoggedIn, getLoggedInUserDetails)

module.exports = router