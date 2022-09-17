const path = require("path");
const fs = require("fs");
const {parse} = require('csv-parse')
const Employee = require("../../models/employee")

const importCSV = async (req, res, next) => {
    if (! req.file) {
        return next(new Error('CSV file missing'))
    }
    const csvUrl = path.join(__dirname, '../../uploads', req.file.filename)
    const list = []
    fs.createReadStream(csvUrl)
        .pipe(parse({delimiter: ';'}))
        .on('data', (row) => {
            console.log(row)
            list.push(row)
        }).on('end', () => {
            list.shift()
            console.log(list)
            if (list.length > 0) {
                const mappedList = list.map(item => ({
                    firstname: item[0],
                    lastname: item[1],
                    username: `${item[0]}_${item[1]}`,
                    password: 'password',
                    address: `${item[3]}, ${item[2]}, ${item[4]}, ${item[5]}, ${item[6]}`,
                    role: `${item[7]}`,
                }))
                Employee.insertMany(mappedList, (err, items) => {
                    if(err) {
                        next(err)
                    } else {
                        res.json({
                            result: items
                        })
                    }
                })

            }

            fs.unlinkSync(csvUrl)
        })
}

module.exports = importCSV