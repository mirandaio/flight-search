var express = require('express');
var http = require('http');

var app = express();

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.get('/airlines', function(req, res) {
  getAirlines().then(function(airlines) {
    res.set('Content-Type', 'application/json');
    res.send(airlines);
  });
});

app.get('/airports', function(req, res) {
  res.end('some airports');
});

app.get('/search', function(req, res) {
  var from = req.query.from;
  var to = req.query.to;
  var date = req.query.date;
  res.json({
    from: from,
    to: to,
    date: date
  });
});

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
        resolve(body.join(''));
      });
    });
  });
}

app.listen(process.env.PORT || 8764);
console.log('Listening on port 8764');
