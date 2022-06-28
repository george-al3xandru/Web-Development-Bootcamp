//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

// https://mailchimp.com/help/about-api-keys/
  const apiKey = "b392a97a9b0bc89c056f37c5abece7d0-us18";
// https://mailchimp.com/help/find-audience-id/
  const audienceID = "9ae1a0d8f9";
  const url = "https://us18.api.mailchimp.com/3.0/lists/9ae1a0d8f9";
  const options = {
    method: "POST",
    auth: "george:" + apiKey
  }

  const request = https.request(url, options, function(response){
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/succes.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  });
    request.write(jsonData);
    request.end();
});

  app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
});
