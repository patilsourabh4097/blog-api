const user = require('../models/user')

exports.getCurrentUser = async (req, res) => {
    // gets current user
    let currUser = {
        success: "Success",
        data: {
            username: req.user.userName,
            id: req.user._id
        }
    }

    res.json(currUser)
}

exports.getUser = async (req, res) => {
    let name = req.params.name
    let currUser = await user.findOne({ userName: name })

    if (!currUser) {
        res.json({
            err: "user dosent exist"
        })
        return
    }

    let resUser = {
        username: currUser.userName,
        posts: currUser.posts
    }



    res.json(resUser)
}