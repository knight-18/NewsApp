const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = isLoggedIn = async (req, res, next) => {
    try {
        let token = req.cookies.authorization

        if (!token) {
            req.loginStatus = false
        }

        let decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) 
            req.loginStatus = false
        else
        {
            req.loginStatus = true
         }

        next()
    } catch (error) {
        console.log(error)
        req.loginStatus = false
        next()
    }
    
}


