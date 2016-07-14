var express = require('express');

var app = express();

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.get('/airlines', function(req, res) {
  res.end('some airlines');
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

app.listen(process.env.PORT || 8764);
console.log('Listening on port 8764');
