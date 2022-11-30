//importing mysql instances from the package
var mysql = require('mysql');

//creating connection variables
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "auto"
});
connection.connect(function(error) {
    // throwing error /exception
    if (error) throw error;
    if (error) {
         console.log('db not connected');
        }
    // } else {
    //     console.log('db connected');

    // }
});

// exporting connection to be used globally
module.exports = connection;

