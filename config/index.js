const os = require("os")

const host = os.hostname()

module.exports = {
    HOST: host,
    PORT: 8080,
    DB_URL: 'mongodb://marouane:password@127.0.0.1/badumts?authSource=admin',
    SECRET_KEY: 'secretkeyphrase',
}