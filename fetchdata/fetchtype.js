const express  = require('express');
const axios = require('axios')
const request= require('request');
const connection =require('../database_conn');
var mysql = require('mysql');
//

//exporting function
exports.fetchtype = function () {
axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
.then(function (response) {
//looping through the json file to check the length
    // for (var i = 0; i <response.data.Results.length; i++) {
        for (var j = 0; j <3; j++) {

        //console.log(`inserting device: ${j+1} of ${response.data.Results.length}:`, response.data.Results[j]);

        let types = { ...response.data.Results[j]};
        //checking for undifined input,if yes data is ignonred
        if(types.MakeId !=undefined  && types.MakeName !=undefined && types.VehicleTypeName !=undefined){
            connection.query(`INSERT INTO types(MakeId,MakeName,VehicleTypeName) VALUES(?,?,?)`,
                  [types.MakeId, types.MakeName,types.VehicleTypeName],
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
//
 