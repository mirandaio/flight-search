window.onload = function() {
  var form = document.querySelector('form');
  var from = 
  var searchBtn = document.getElementById('search');
  var airlines = document.getElementById('airlines');
  var airports = document.getElementById('airports');

  searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var from = form.elements.from.value;
    var to = form.elements.to.value;
    var date = form.elements.date.value;
    getFlightInfo(from, to, date).then(function(data) {
      console.log(data);
    });
  });

  airlines.addEventListener('click', function() {
    getAirlines().then(function(airlines) {
      console.log(airlines);
    });
  });

  airports.addEventListener('click', function() {
    getAirports().then(function(airports) {
      console.log(airports);
    });
  });
};


function getFlightInfo(from, to, date) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/search?from=' + from + '&to=' + to + '&date=' + date);
    xhr.responseType = 'json';
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.send();
  });
}

function getAirlines() {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/airlines');
    xhr.responseType = 'json';
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.send();
  });
}

function getAirports() {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/airports');
    xhr.responseType = 'json';
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.send();
  });
}
