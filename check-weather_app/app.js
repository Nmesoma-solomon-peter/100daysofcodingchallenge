const express = require('express');
const bodypaser = require('body-parser');
const https = require('https');
const app = express();
app.use(bodypaser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post('/', function (req, res) {
    const q =req.body.countryName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+q+"&appid=4e5f070cda7c993b4bc9d86bfc60e38e&units=metric";
    https.get(url, function (response) {
        response.on('data',function(data){
            const weatherdata = JSON.parse(data);
            const description = weatherdata.weather[0].description;
            const temp = weatherdata.main.temp;
            const country = weatherdata.name;
            const icon = weatherdata.weather[0].icon;
            const imgurl =  "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            
            res.write("<p> The weather discription in "+ country +" is <bold>"+description+"</bold></p>")
            res.write("<h1> The temperature is "+temp +" degrees celcuis</h1>")
            res.write("<img src="+imgurl+"/>")
            res.send();

        })
    })
})

app.listen(3000, function () {
    console.log("server running at port 3000: OK");
})