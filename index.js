var express = require('express');

var app = express();

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.listen(process.env.PORT || 8764);
console.log('Listening on port 8764');
