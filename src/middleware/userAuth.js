var jwt = require('jsonwebtoken')
var User = require('../models/user')

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.authorization
        if (!token) {
            throw new Error('User is not logged in')
        }

        let decodedData = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedData) throw new Error('Invalid Credentials')

        let user = await User.findById(decodedData.id)

        if (!user) throw new Error('Invalid Credentials')

        req.user = user

        next()
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}
