const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const session = require('express-session')


const app = express()
app.use(express.json())

require('dotenv').config()

const PORT = process.env.PORT || 3000

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log('MongoDb Connected'))
    .catch((err) => console.error(err))

app.set('view engine', 'ejs')

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(bodyParser.json())
app.use(cookieParser('secret_passcode'))
app.use(
    session({
        secret: 'secret_passcode',
        cookie: {
            maxAge: 4000000,
        },
        resave: false,
        saveUninitialized: false,
    })
)

const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

// import Routes
const indexRoutes = require('./routes/index')
// Accessing Routes
app.use('/', indexRoutes)

//Start the server
app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
})
