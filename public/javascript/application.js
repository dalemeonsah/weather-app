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


  // Weather Information
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
      // console.log(cityInfo.current_observation);
      $(".weather-container").empty();
      var cityname = cityInfo.current_observation.display_location.city;
      var countryname = cityInfo.current_observation.display_location.country;
      var temperature_string = cityInfo.current_observation.temperature_string;
      var weather = cityInfo.current_observation.weather;
      var feels_like_c = cityInfo.current_observation.feelslike_c;
      var last_obs_time = cityInfo.current_observation.observation_time;

      $("<h2>").text("City of " + cityname + "," + countryname).appendTo(".weather-container");
      $("<h3>").text(last_obs_time).appendTo(".weather-container");
      $("<p>").text("The weather is " + weather).appendTo(".weather-container");
      $("<p>").text("It feels like " + feels_like_c + " degree celcius").appendTo(".weather-container");
      $("<p>").text("Real temperature now is " + temperature_string).appendTo(".weather-container");

      //console.log(temperature_string);
    }, function failCityWeatherInfo(){
      console.log('fail info');
    });




  });
});
