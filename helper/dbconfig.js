const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'nilamiadda',
    password: 'nilami_data',
    database: 'nilamiadda'
})

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;