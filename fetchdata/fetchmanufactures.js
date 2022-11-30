const express  = require('express');
const axios = require('axios')
const request= require('request');
const connection =require('../database_conn');
var mysql = require('mysql');
//exporting function
try{
exports.fetchmanufactures = function () {
axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=2')
.then(function (response) {

    let query = "SELECT COUNT(*) AS id FROM manufacturers";
              
    connection.query(query, (err, rows) => {

        
        if(err) throw err;
        //converting to js string for readabilty
         var string=JSON.stringify(rows);
         var num =  JSON.parse(string);
         //checking if empty ,if no ,insert
        if(num[0].id>=1 ){
        
        // console.log("is not empty");
        // console.log(num[0].id);

//looping through the json file to check the length and loop
for (var i = 0; i <response.data.Results.length; i++) {
    //console.log(`inserting device: ${i+1} of ${response.data.Results.length}:`, response.data.Results[i]);

    let manufacturers = { ...response.data.Results[i]};
    //checking for undifined input,if yes data is ignonred
    if(manufacturers.Mfr_CommonName !=undefined  && manufacturers.Mfr_ID !=undefined && manufacturers.Mfr_CommonName !=undefined){
    

let sql = `UPDATE manufacturers
        SET Country = ? ,Name = ? , MfrID = ?
        WHERE id = ${manufacturers.Mfr_ID}`;

let data = [manufacturers.Country, manufacturers.Mfr_CommonName, manufacturers.Mfr_ID];

// execute the UPDATE statement
connection.query(sql, data, (error, results, fields) => {
if (error){
 return console.error(error.message);
}
//console.log('Rows affected:', results.affectedRows);
});

        // end
             
    }else{
        //console.log("Can not save empty value");
    }   
};
//end   
        }

        //if yes,update
        else if(num[0].id<=0){
        // console.log("is empty");
        // console.log(num[0].id);

//looping through the json file to check the length and loop
    for (var i = 0; i <response.data.Results.length; i++) {
        //console.log(`inserting device: ${i+1} of ${response.data.Results.length}:`, response.data.Results[i]);

        let manufacturers = { ...response.data.Results[i]};
        //checking for undifined input,if yes data is ignonred
        if(manufacturers.Mfr_CommonName !=undefined  && manufacturers.Mfr_ID !=undefined && manufacturers.Mfr_CommonName !=undefined){
        
            connection.query(`INSERT INTO manufacturers(Country,Name,MfrID) VALUES(?,?,?)`,
                  [manufacturers.Country, manufacturers.Mfr_CommonName, manufacturers.Mfr_ID],
                   function(error) {
                    //displaying error code
                    if (error) {
                       // console.error(error);
                    }
                    
                });
                 
        }else{
            //console.log("Can not save empty value");
        }   
    };
    //end
        }
          
       
    });


    //
});
};
 }
 catch(ex){
 console.log("Error,API:bad responses");
}
