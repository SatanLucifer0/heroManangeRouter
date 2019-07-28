var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: '37'
});

connection.connect();

module.exports={
    connection
};

// connection.end();