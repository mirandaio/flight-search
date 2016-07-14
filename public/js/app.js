window.onload = function() {
  var searchBtn = document.getElementById('search');
  var form = document.querySelector('form');

  searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var from = form.elements.from.value;
    var to = form.elements.to.value;
    var date = form.elements.date.value;
    getFlightInfo(from, to, date).then(function(data) {
      console.log(data);
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
