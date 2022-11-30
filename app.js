const express  = require('express');
const axios = require('axios')
const request= require('request');
const connection =require('./database_conn');
var mysql = require('mysql');
const bodyParser = require('body-parser'); // Middleware 



//server
const path = require('path');	
const ejs = require('ejs');
const app = express();
const PORT = 5050;




//importing the function /fetchmanufactures
const fetchmanufactures =require('./fetchdata/fetchmanufactures');
//consoling to the screen
console.log(fetchmanufactures.fetchmanufactures());

//importing the function / types
const fetchtype =require('./fetchdata/fetchtype');
//consoling to the screen
console.log(fetchtype.fetchtype());

//importing the function / types
const fetchyear =require('./fetchdata/fetchyear');
//consoling to the screen
console.log(fetchyear.fetchyear());
//
// Start the server
app.listen(PORT, err =>{
	err ?
	console.log("Error in server setup") :
	console.log("Server listening on Port", PORT)
});

 
//storing exported values into a variable
 let brandnamedata='Brand';
 let Countrynamedata='Country';
 let yearNamedata='Year';
 let branddata= [];
 let brandCountry= [];
 let id= [];
 let yeardata= [];

 //popualatin
 for(var j=1886;j<=2023;++j){
    yeardata.push(j);
 }
//  let brandt= ftypes.brandtry;
  
    connection.connect(async (err) =>{
        //  if connection is successful

         const query="SELECT DISTINCT Name,Country,MfrID FROM manufacturers";
        connection.query(query, (err, result, fields) =>{
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the 
        result.forEach(element => {
            branddata.push(element.Name);
            //country fecth
            brandCountry.push(element.Country);
            // id
            id.push(element.MfrID);
        });
//logging it to output
const types = {
        brandname : brandnamedata,
        brand: [...branddata]  

}

// country
const country = {
    countryname : Countrynamedata,
    countries: [...brandCountry]  

}

// manu id
const Mfrid = {
    
     mfriddata: [...id]  

}

// year
const year = {
    yearName : yearNamedata,
    yearValdata: [...yeardata]  

}


app.get('/', (req,res)=>{
	// render method takes two parameters
	// first parameter should be the .ejs file
	// second parameter should be an object
	// which is accessible in the .ejs file
	// this .ejs file should be in views folder
	// in the root directory.
	res.render('index.ejs', {types:types,
        country:country,
        Mfrid:Mfrid,
        year:year
    });
})});


      });



     //getting form input here
      app.use(bodyParser.urlencoded({ extended: false }));
      app.post('/user_form', (req, res) => {
        // requesting data from user_form /views/index.ejs
        let brandcountry = req.body.brandcountry;
        let brandname = req.body.brandname;
        let year = req.body.year;
         

        //inserting data into the dataasbe
        connection.query(`INSERT INTO user_data(Country,brand,year) VALUES(?,?,?)`,
        [brandcountry,brandname,year],
         function(error) {
          //displaying error code
          if (error) {
             // console.error(error);
          }
          
      });
        connection.end();
        //redirecting after inserting data into the database
        res.redirect('./');

        
        
      });
      








