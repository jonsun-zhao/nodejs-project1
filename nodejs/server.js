// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
//
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('nodejs'));


// create application/json parser
var jsonParser = bodyParser.json();


// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile('/home/jonsun/nodejs-project/nodejs/index.html');
  console.log('a get request')
});

app.get('/client.js', function(request, response) {
  response.sendFile('/home/jonsun/nodejs-project/nodejs/client.js');
  console.log('send client.js to client')
});

// endpoint to addUser in the database
// currently this is the only endpoint, ie. adding dreams won't update the database

app.post('/addUser', jsonParser, function(request, response) {

  console.log('a post request')
var req = request;
// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "35.223.78.64",
  user: "root",
  password: "test",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  
  let createusers = `create table if not exists users(
                          name varchar(255) primary key,
                          favorite-color varchar(255),
                          cats-or-dogs varchar(255)
                      )`;
  console.log('New table users Created!');
  var sql = "INSERT INTO userlist (name, favorite-color, cats-or-dogs) VALUES ('"+reqest.body.name+"','"+reqest.body.favorite-color+"','"+reqest.body.cats-or-dogs+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

});


// listen for requests :)
var listener = app.listen(port, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


