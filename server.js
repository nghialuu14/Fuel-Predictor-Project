// Libraries used for the Node Express Server
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

// Used for parsing JSON to retrieve information from frontend
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

// Start at index.html
app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: __dirname})
})

// Client Registration backend
const registerRouter = require('./routes/register')
app.use('/register', registerRouter)

// Login backend
const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

// Profile Management backend
const profileManRouter = require('./routes/profileManagement')
app.use('/profile', profileManRouter)

// Get Profile information
const getProfileRouter = require('./routes/getprofile')
app.use('/getprofile', getProfileRouter)

// Fuel Quote
const quoteRouter = require('./routes/historyModule')
app.use('/quote', quoteRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})