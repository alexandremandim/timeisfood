var mysql = require('mysql');
const pool = mysql.createPool({
    connectionlimit: 10,
    host: "",
    user: "",
    password: "",
    database: "",
    dateStrings: true
});

module.exports = pool

