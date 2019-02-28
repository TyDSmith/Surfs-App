// This is our API key. Add your own API key between the ""
var APIKey = "";
// Here we are building the URL we need to query the database
var queryURL = "http://api.spitcast.com/api/spot/all";
// We then created an AJAX call
var fTemp = null;
var lat = null;
var long = null;
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
    console.log(queryURL);       
    console.log(response);
    var fTemp = (((response.main.temp - 273.15)*1.8) + 32);
    var lat = response.coord.lat;
    var long = response.coord.lon;
    var wIcon = response.weather[0].icon;
    console.log(wIcon);
    $(".icon-output").html("<img src='"+ wIconURL+ "' >");
    $(".city").text(response.name);  
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);  
    $("#lat-long").text(" "+ lat + ", " + long); 
    $("#temp-output").text(fTemp + " Degrees");
    if (fTemp >= 70){
        $("#temp-output").css("color", "orange");
    };
    if (fTemp <= 69){
        $("#temp-output").css("color", "green");
    };
    if (fTemp <= 40){
        $("#temp-output").css("color", "blue");
    };
});