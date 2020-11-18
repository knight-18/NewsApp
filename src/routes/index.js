const { response } = require('express')
const express = require('express')
const router = express.Router()

const adminRoutes = require('./admin')
const userRoutes = require('./user')
const postRoutes = require('./post')

router.use('/admin', adminRoutes)
router.use('/user', userRoutes)
router.use('/post', postRoutes)

router.get('/', async (req, res) => {
    res.render('index')
})

router.get('*', async (req, res) => {
    res.status(404).send('Invalid Page')
})

module.exports = router
