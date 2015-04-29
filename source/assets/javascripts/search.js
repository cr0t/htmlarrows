(function(){

  var searchField = document.querySelector("#search");
  var cacheResponse;


  var getJSON = function(url, callback){
    if (cacheResponse) {
      callback(cacheResponse);
      return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (xhttp.status == 200 && xhttp.readyState == 4) {
        callback(xhttp.responseText);
      }
    };
  };

  searchField.addEventListener("keyup", function(e){
    var value = e.srcElement.value;
    var results = document.querySelector(".search-results");
    var regex = new RegExp(value, "i");
    var output = '<div class="row">';
    var count = 1;

    // Only return results if there's more than 2 char
    if (value.length < 2){
      results.innerHTML = "";
      return;
    }

    getJSON('/all.json', function(data) {
      if (!cacheResponse){
        cacheResponse = data;
      }
      var jsonData = JSON.parse(data).entities;

      jsonData.forEach(function(key, val){
        if ( key.name.search(regex) != -1 ){
          output += "<div class='col-md-6'>" + key.name + "</div>"
          console.log(key.name);
        }
      });

      // Append the html to the results panel
      results.innerHTML = output;
    });
  });



})();

