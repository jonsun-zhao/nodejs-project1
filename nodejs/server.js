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

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "10.1.0.3",
  user: "root",
  password: "test",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("mysql Connected!");
  
  let createusers = `create table if not exists users(
                          name varchar(255) primary key,
                          favoritecolor varchar(255),
                          catsordogs varchar(255)
                      )`;

  con.query(createusers, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
     console.log("user table created.")
  });

  var username = request.body.name;
  var color = request.body.favoritecolor;
  var catdog = request.body.catsordogs;

  var sql = 'INSERT INTO users (name, favoritecolor, catsordogs) VALUES (?, ?, ? ) ON DUPLICATE KEY UPDATE favoritecolor = VALUES (favoritecolor), catsordogs = VALUES (catsordogs)';
  con.query(sql,[username, color, catdog], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    });

  con.query('SELECT * from users', function(err, rows) {
        response.send(rows);
    });

 
  con.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
//con.connect
});

//app.post
});


// listen for requests :)
var listener = app.listen(port, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

