const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = isLoggedIn = async (req, res) => {
    try {
        let token = req.cookies.authorization

        if (!token) {
            return false
        }

        let decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return false
        }

        let user = await User.findById(decodedData.id)
        if (!user) {
            return false
        }

        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
