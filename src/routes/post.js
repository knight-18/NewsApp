const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const isLoggedIn = require('../utils/isLoggedIn')
const userAuth = require('../middleware/userAuth')
const Post = require('../models/Post/post')
const user = require('../models/user')

router.get('/', async (req, res) => {
    try {
        console.log('Route to get posts')
    } catch (error) {
        console.log(error)
    }
})

router.post('/', userAuth , async (req, res) => {
    let { title, description, location } = req.body

    try {
        
        const post = new Post({
            title,
            description,
            location,
            author: req.user._id,
        })

        post.shareLink = `/user/post/${post._id}`
        await post.save()

        res.redirect('/user/profile')
    } catch (error) {
        console.log(error)
        res.redirect('/user/profile')
    }
})

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id

        let post = await Post.findById(id)
        if (!post) {
            console.log('No such Post Exists')
            res.redirect('/')
            return
        }
        await post
            .populate({ path: 'author', select: ' name email' })
            .execPopulate()
        console.log('Post Log', post)

        res.render('viewPost', {
            post,
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
