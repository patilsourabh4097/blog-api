const express = require('express')
const router = express.Router()
const userController = require('../controller/user-controller')
const authController = require('../controller/auth-controller')

//get user
router.get('/:name', userController.getUser)
//get current user
router.get('/', authController.isAuth, userController.getCurrentUser)


module.exports = router