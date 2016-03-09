$(function() {
  $('#search').on('keypress', function(e){
    var p = e.which;
    // upon enter key is pressed
    if (p == 13){
      //console.log("enter key pressed");
      var query = $('#search').val()
      //console.log(query);
      $.ajax({
        url: "http://autocomplete.wunderground.com/aq?query=" + query,
        method: "GET",
        dataType: 'jsonp',
        jsonp: 'cb' // or + '&cb=?' in the url
      }).then(function successSearch(cities){
        // console.log(cities);
        // console.log(cities.RESULTS);
        // console.log(cities.RESULTS[0].name);
        var cityResults = cities.RESULTS;
        var citylist = $("#citylist");

        citylist.empty();
        for(var city in cityResults){
          var cityname = cityResults[city].name;
          $("<li>").text(cityname).appendTo(citylist);
        }
      }, function failSearch(){
        console.log('fail');
      });
    }
  })
});
