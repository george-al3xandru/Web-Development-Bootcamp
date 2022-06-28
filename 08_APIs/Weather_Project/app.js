const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "3987936c7e8c1bf835247390f4138e49"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write('<head><meta charset="utf-8"><title>Weather App</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"><link href="styles.css" rel="stylesheet"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"></head>');
      res.write('<body><div class="heading">')
      res.write("<h1>The temperature in " + query + " is " + temp +  " degrees Celsius.</h1>");
      res.write("<h2>The weather is curently: " + weatherDescription + ".</h2>");
      res.write("<img class='vert-move weather-image' src=" + imageURL + ">");
      res.write('<p class="lead"><button class="btn btn-dark btn-lg home-button" type="submit" onclick="history.back()" name="button">Go To Homepage</button></p>');
      res.write("</div></body>")
      res.send();
    });
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
});
