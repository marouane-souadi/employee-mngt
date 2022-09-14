const express = require("express")
const authRoutes = require("./routes/auth")
const errorHandler = require("./controllers/errors")

const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('*', (req, res) => {
    res.json({message: 'connected'})
})

app.use(errorHandler.notFound)
app.use(errorHandler.error)

module.exports = app