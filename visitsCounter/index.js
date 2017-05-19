var express = require('express');
var fs = require('fs');

//CONFIGURATION
var port = 8080;
var app = express();
var visitsFilename = 'homepagevisits.txt';

var homepageVisitCount = 0;


app.get("/", function (req, res) {
    //serve up cats homepage
    fs.readFile("./cats.html", function(err,data){
        if(err){
            console.log(err);
            res.status(500);
            res.send("500 - Internal Server Error");
        }
        //increment the count for each time the homepage is visited
        //read the homepage visits from a text file on server
        fs.readFile(visitsFilename, function (err, data) {
            if (err) {
                console.log(err);
                //if the file does not exist, then make it and give it a count of 1
                fs.writeFile(visitsFilename, "1", function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.send("500 - Internal Server Error");
                    }
                    //write file and respond
                    res.status = 200;
                    res.send();
                });
                return;
            }
            //If if the text file does exist, then get the data and increment it
            var visits = data.toString();
            visits++;
            //Save the count back to the file
            fs.writeFile(visitsFilename, visits, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500);
                    res.send("500 - Internal Server Error");
                }
            });
        });

        res.status = 200;
        res.send(data.toString());
    })
})

app.get("/count", function (req, res) {
    //Read the visit count from the text file
    fs.readFile(visitsFilename, function (err, data) {
        if (err) {
            console.log(err);
            //if the file does not exist, then make it and give it a count of 1
            fs.writeFile(visitsFilename,"1", function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500);
                    res.send("500 - Internal Server Error");
                }
                res.status(200);
                res.send("Number of Homepage Visits: 1");
            });
            return;
        }
        var visits = data.toString();
        res.status(200);
        //Return count to the user
        res.send("Number of Homepage Visits: " + visits);
    });
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