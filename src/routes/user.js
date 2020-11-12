const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get('/login', async (req, res) => {
    res.render('userLogin')
})

module.exports = router
