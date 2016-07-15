var express = require('express');
var http = require('http');

var app = express();

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.get('/airlines', function(req, res) {
  getAirlines().then(function(airlines) {
    res.json(airlines);
  });
});

app.get('/airports', function(req, res) {
  getAirports('Melbourne').then(function(airports) {
    res.json(airports);
  });
});

app.get('/search', function(req, res) {
  var from = req.query.from;
  var to = req.query.to;
  var date = req.query.date;
  var searchPromises = [];
  getAirlines().then(function(airlines) {
    airlines.forEach(function(airline) {
      console.log(airline);
    });
    console.log('done printing airlines');

    res.json({
      from: from,
      to: to,
      date: date
    });
  });
});

function getFlightInfo(airline, from, to, date) {

}

function getAirlines() {
  return new Promise(function(resolve, reject) {
    http.get({
      host: 'node.locomote.com',
      path: '/code-task/airlines'
    }, function(res) {
      res.setEncoding('utf8');
      var body = [];
      res.on('data', function(d) {
        body.push(d);
      });
      res.on('end', function() {
        resolve(JSON.parse(body.join('')));
      });
    });
  });
}

function getAirports(place) {
  return new Promise(function(resolve, reject) {
    http.get({
      host: 'node.locomote.com',
      path: '/code-task/airports?q=' + place
    }, function(res) {
      res.setEncoding('utf-8');
      var body = [];
      res.on('data', function(data) {
        body.push(data);
      });
      res.on('end', function() {
        resolve(JSON.parse(body.join('')));
      });
    });
  });
}

app.listen(process.env.PORT || 8764);
console.log('Listening on port 8764');
