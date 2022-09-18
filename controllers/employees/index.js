const add = require("./add")
const getAll = require("./list")
const importCSV = require("./importCSV")
const deleteItem = require("./delete")
const edit = require("./edit")
const get = require("./get");

module.exports = {
    getAll,
    add,
    importCSV,
    deleteItem,
    edit,
    get,
}