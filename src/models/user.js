const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//JWT function to generate auth tokens
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign(
        { id: user._id.toString() },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE || 129600,
        }
    )

    await user.save()

    return token
}

//function to find user by email and verify password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('No such User exists. Try creating an account.')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Invalid Credentials')
    }

    return user
}

//To hash the password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

module.exports = User = mongoose.model('User', userSchema)
