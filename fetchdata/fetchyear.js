const express  = require('express');
const axios = require('axios')
const request= require('request');
const connection =require('../database_conn');
var mysql = require('mysql');
const { end } = require('../database_conn');
//

//exporting function
exports.fetchyear = function () {
axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForManufacturerAndYear/mer?year=2014&format=json')
.then(function (response) {
//looping through the json file to check the length
    // for (var i = 0; i <response.data.Results.length; i++) {
        for (var k = 0; k <3; k++) {
            
        ///console.log(`inserting device: ${k+1} of ${response.data.Results.length}:`, response.data.Results[k]);

        let year = { ...response.data.Results[k]};
        //checking for undifined input,if yes data is ignonred
        if(year.MakeId !=undefined  && year.MakeName !=undefined && year.MfrId !=undefined && year.MfrName !=undefined){
            connection.query(`INSERT INTO year(MakeId,MakeName,MfrId,MfrName) VALUES(?,?,?,?)`,
                  [year.MakeId, year.MakeName,year.MfrId,year.MfrName],
                   function(error) {
                    //displaying error code
                    if (error) {
                        //console.error(error);
                    }
                    
                });
        }else{
            console.log("Can not save empty value");
        }   
    };
});
};
//
 