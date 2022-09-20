const os = require("os")

const host = os.hostname()

module.exports = {
    HOST: host,
    PORT: 8080,
    DB_URL: process.env.DB_URL || 'mongodb://marouane:password@localhost/badumts?authSource=admin',
    SECRET_KEY: 'secretkeyphrase',
}