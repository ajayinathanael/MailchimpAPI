//jshint esversion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

//body parser
app.use(bodyParser.urlencoded({extended:true}));

//static files
app.use(express.static('public'));

//for body parser
app.get("/", function(req,res){
  res.sendFile(__dirname +"/signup.html");
});

//post request
app.post("/", function(req,res){
  const fname = req.body.firstName;
  const lname = req.body.lastName;
  const email = req.body.emailAddress;
  //console.log(fname, lname, email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/1a3e381245";

  const options = {
    method: "POST",
    auth: "Nath001:c4726388d012854502b491a6dc003c79-us14"
  }

//bcs we wanna post data to mailchimp api
  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname +"/success.html");
      //res.send("Successfully subcribed");
    }else{
      res.sendFile(__dirname +"/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
})

//defined route
app.get("/me", function(req,res){
  res.send("As always practice makes perfect!");
});

//server
app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on Port 3000");
});


//Mailchimp
//c4726388d012854502b491a6dc003c79-us14

//list id
//1a3e381245
