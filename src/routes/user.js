const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const isLoggedIn = require('../utils/isLoggedIn')
const userAuth = require('../middleware/userAuth')
const Post = require('../models/Post/post')
const user = require('../models/user')

router.get('/login', async (req, res) => {
    try {
        let alreadyLoggedIn = await isLoggedIn(req, res)
        if (!alreadyLoggedIn) {
            res.render('userLogin')
            return
        }
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.render('userLogin')
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findByCredentials(email, password)
        if (!user) {
            console.log('unable to login')
            res.redirect('/user/login')
            return
        }

        let token = await user.generateAuthToken()

        res.cookie('authorization', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
        })

        res.redirect('/user/profile')
    } catch (error) {
        console.log(error)
        res.redirect('/user/login')
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('authorization')
    res.redirect('/')
})

router.get('/signup', async (req, res) => {
    try {
        let alreadyLoggedIn = await isLoggedIn(req, res)
        if (!alreadyLoggedIn) {
            res.render('userSignup')
            return
        }
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.render('userSignup')
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body

        let alreadyExists = await User.findOne({ email })
        if (alreadyExists) {
            res.redirect('/user/signup')
            return
        }
        let user = new User({
            name,
            email,
            password,
        })

        let savedUser = await user.save()

        if (!savedUser) {
            res.redirect('/user/signup')
            return
        }
        console.log('Account Created Successfully')
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.redirect('/user/signup')
    }
})

router.get('/profile', userAuth, async (req, res) => {
    try {
        let user = req.user
        let posts = await user.populate('posts').execPopulate()
        // console.log(posts)
        console.log(user)
        res.render('userProfile', {
            user,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
module.exports = router
