var express = require('express');
var fs = require('fs');

//CONFIGURATION
var port = 8080;
var app = express();

var homepageVisitCount = 0;


app.get("/",function(req,res){
    fs.readFile("./cats.html", function(err,data){
        if(err){
            console.log(err);
        }
        //increment the count for each time the homepage is visited
        homepageVisitCount++;
        res.status = 200;
        res.send(data.toString());
    })
})

app.get("/count", function (req, res) {
    res.status(200);
    res.send("Number of Homepage Visits: " + homepageVisitCount.toString());
});

app.use(function (req, res, next) {
    res.status(404);
    res.send("404 - Resource not found");
})

//500 error
app.use(function(err,req,res,next){
    if (err) {
        console.log(err);
        res.status(500);
        res.send("500 - Internal Error");
    }
})

app.listen(port, function(){
    console.log(`Started server at http://localhost:${port}`);
});