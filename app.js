const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const { cpuUsage } = require("process");
const { response } = require("express");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apikey = "c03930101a5070010df626f5dd24daa3";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    units;

  https.get(url, function (respuesta) {
    console.log(respuesta.statusCode);
    respuesta.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      // console.log(temp);
      const descrip = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const id = weatherData.weather[0].id;
      const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>La temperature a " +
          query +
          " est de: " +
          temp +
          "C</h1><br>" +
          "<h2>" +
          descrip +
          "</h2>"
      );
      res.write("<img src='" + imgurl + "'></img>");
      //res.write();
      res.send();
    });
  });

  app.get("/c", function (req, res) {});

  res.send("Server is up and running");
});

app.listen(process.env.PORT || 5000, function () {
  console.log("Server is running in 3000 jordan http://localhost:5000/");
});
