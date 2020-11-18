const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get('/login', (req, res) => {
    res.render('adminLogin')
})

router.post('/login', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        if (
            username !== process.env.adminUsername ||
            password !== process.env.adminPassword
        ) {
            console.log('Invalid Credentials')
            return res.status(401).send('Invalid Credentials')
        }

        const token = jwt.sign(
            { admin: `${username}${password}` },
            process.env.JWT_SECRET
        )
        res.cookie('authorization', token, {
            httpOnly: false,
        })
        res.render('adminHome')
    } catch (error) {
        console.log(error)
        res.send(500).send(error)
    }
})

router.get('/logout', async (req, res) => {
    res.clearCookie('authorization')
    res.redirect('/')
    return
})

module.exports = router
