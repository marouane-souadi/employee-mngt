const express = require("express")
const authRoutes = require("./routes/auth")
const errorHandler = require("./controllers/errors")
const employeesRoutes = require("./routes/employees")
const commentsRoutes = require("./routes/comments")
const path = require("path");

const app = express()
app.use(express.json())

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use('/api/auth', authRoutes)
app.use('/api/employees/:employeeId/comments', commentsRoutes)
app.use('/api/employees', employeesRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'client', 'build', 'index.html'))
})

app.use(errorHandler.notFound)
app.use(errorHandler.error)

module.exports = app