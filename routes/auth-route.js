const authController = require('../controller/auth-controller')
const router = require('express').Router()

//sign-up 
router.post('/sign-up', authController.signUp)
//login 
router.post('/log-in', authController.login)


module.exports = router 