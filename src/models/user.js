const mongoose = require('mongoose')
const crypto = require('crypto')

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = User = mongoose.model('User', userSchema)
