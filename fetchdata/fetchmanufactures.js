const express  = require('express');
const axios = require('axios')
const request= require('request');
const connection =require('../database_conn');
var mysql = require('mysql');
//exporting function
exports.fetchmanufactures = function () {
axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=2')
.then(function (response) {

//looping through the json file to check the length
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
});
};
 