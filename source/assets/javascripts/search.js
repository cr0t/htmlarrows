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
    var results = document.querySelector(".results");
    var regex = new RegExp("\\b" + value, "i");

    var output = '<div class="row">';
    var count = 1;

    // Only return results if there's more than 1 char
    if (value.length < 1){
      results.innerHTML = "";
      return;
    }

    getJSON('/search-data.json', function(data) {
      if (!cacheResponse){
        cacheResponse = data;
      }
      var jsonData = JSON.parse(data);

      jsonData.forEach(function(key, val){
        if ( key.n.search(regex) != -1 ){
          var link = "'/" + key.t + "/" + key.s + "/'"
          var icon = "<div class='symbol'><a href=" + link + ">&" + key.h + "</a></div>"
          var unicode = "<code>" + key.u + "</code>"
          var hex = "<code>&amp;" + key.x + "</code>"
          var html = "<code>&amp;" + key.h + "</code>"

          output += "<div class='col-md-3'>" + icon + "<div class='codes'>" + unicode + hex + html + "</div></div>"
        }
      });

      // Append the html to the results panel
      results.innerHTML = output;
    });
  });



})();

