const app = require("./app")
const config = require("./config");

app.listen(config.PORT, () => {
    console.log(`App started on http://${config.HOST}:${config.PORT}`)
})

