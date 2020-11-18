const jwt = require('jsonwebtoken')
require('dotenv').config()

const adminAuth = function (req, res, next) {
    try {
        // console.log(req.cookies);
        const token = req.cookies.authorization
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = decoded.admin

        if (
            admin !== `${process.env.adminUsername}${process.env.adminPassword}`
        ) {
            throw new Error('Invalid Credentials')
        }
        req.token = token

        next()
    } catch (error) {
        res.status(401).send({
            error: 'Please Login to access the admin routes ',
        })
    }
}

module.exports = adminAuth