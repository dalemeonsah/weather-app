$(function() {
  // Search cities
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
          var latitude = cityResults[city].lat;
          var longtitude = cityResults[city].lon;
          var latlon = latitude + ',' + longtitude;
          // console.log(cityname);
          // console.log(latitude + ',' +longtitude);
          var a = $("<a>").attr('href', '#').attr('data-latlon', latlon).addClass('city').text(cityname);
          $("<li>").append(a).appendTo(citylist);
        }
      }, function failSearch(){
        alert('Fail to search');
        console.log('fail');
      });
    }
  });


  // TODO: Weather Information
  $('.city-container').on('click', '.city', function(e){
    e.preventDefault();
    var latlon = $(this).data("latlon");
    //console.log(latlon);

    var apiKey = "051b0b48bf828d17";
    $.ajax({
      url: "http://api.wunderground.com/api/" + apiKey + "/geolookup/conditions/forecast/q/" + latlon + '.json',
      type: 'GET',
      dataType: 'jsonp',
      jsonpCallback: 'cb'
    }).then(function successCityWeatherInfo(cityInfo){
      console.log(cityInfo.current_observation);
    }, function failCityWeatherInfo(){
      console.log('fail info');
    });




  });
});
