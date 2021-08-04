const posts = require('../models/posts')
const comment = require('../models/comment')
const validation = require('./validation')

exports.addComment = async (req, res) => {
    let id = req.params.postId
    let isValid = validation.isValidObjectId(id)
    if (!isValid) {
        res.json({
            err: "Invalid Id"
        })
        return
    }
    let newComment = new comment({
        desc: req.body.desc,
        user: req.user._id
    })

    newComment = await newComment.save()


    let currPost = await posts.findByIdAndUpdate(id, { $push: { comments: newComment._id } })


    res.json({
        success: "Success"
        
    })
}