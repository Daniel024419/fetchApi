//importing mysql instances from the package
var mysql = require('mysql');

try{
//creating connection variables
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "auto"
});
connection.connect(function(error) {
    try{
    // throwing error /exception
    if (error) throw error;
}
catch(ex){
 console.log("database error,xampp is not running");
}

    if (error) {
         console.log('db not connected');
        }
    // } else {
    //     console.log('db connected');

    // }
});

// exporting connection to be used globally
module.exports = connection;

}
catch(ex){
 console.log("database error,xampp is not running");
}
