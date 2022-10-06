import express from 'express';
const router = express.Router()

const { home } = require('../controllers/homeController')

router.route('/').get(home)

module.exports = router