const express = require('express')
const router = express.Router()
const postsController = require('../controller/posts-controller')
const authController = require('../controller/auth-controller')

// get posts on page number
router.get('/page/:page', postsController.getPost)

//add post
router.post('/', authController.isAuth, postsController.addPost)

//get single post
router.get('/:id', postsController.getSinglePost)

//get posts related to perticular usee
router.get('/user/:id', postsController.getUserPost)

module.exports = router