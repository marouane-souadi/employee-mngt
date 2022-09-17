const express = require("express")
const authRoutes = require("./routes/auth")
const errorHandler = require("./controllers/errors")
const employeesRoutes = require("./routes/employees")
const path = require("path");

const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/employees', employeesRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'client', 'build', 'index.html'))
})

app.use(errorHandler.notFound)
app.use(errorHandler.error)

module.exports = app