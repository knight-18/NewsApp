const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = isLoggedIn = async (req, res, next) => {
    try {
        let token = req.cookies.authorization

        if (!token) {
            isLoggedIn = false
            next()
        }

        let decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            req.isLoggedIn = false
            next()
        } else {
            req.isLoggedIn = true
            next()
        }
        next()
    } catch (error) {
        console.log(error)
        req.loginStatus = false
        next()
    }
}
