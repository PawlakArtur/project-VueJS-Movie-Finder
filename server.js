var express     = require('express');
var bodyParser  = require('body-parser');
var path        = require('path');
var fs          = require('fs');

var app = express();

app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.get('/getMovie', function(req,res){
    fs.readFile('data.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        res.json(data);
    });
});

app.post('/sendMovie', function(req,res){
    console.log("someone is posting");
    console.log(req.body);
    var recieved = JSON.stringify(req.body);
    var toSave = '{"savedMovies":'+recieved+'}';
    fs.writeFile("data.json", toSave, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
});

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});