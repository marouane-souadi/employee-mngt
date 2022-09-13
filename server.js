const app = require("./app")
const config = require("./config");
const mongoose = require("mongoose");

mongoose.connect(config.DB_URL, {
    useNewUrlParser : true,
    keepAlive : true
}, (err) => {
    if (err) {
        console.log('error on DB connection: ', err)
    } else {
        app.listen(config.PORT, () => {
            console.log(`App started on http://${config.HOST}:${config.PORT}`)
        })
    }
})

