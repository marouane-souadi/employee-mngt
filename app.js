const express = require("express")
const authRoutes = require("./routes/auth")

const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({message: 'connected'})
})


module.exports = app