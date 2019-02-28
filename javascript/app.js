var fTemp = null;
var lat = null;
var long = null;

// Insert API Key if needed (not needed for spitcast)
var APIKey = "";
// Insert URL of API
var queryURL = "http://api.spitcast.com/api/county/spots/orange-county/";

// Create AJAX call

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(queryURL);       
        console.log(response);

        // var fTemp = (((response.main.temp - 273.15)*1.8) + 32);
        // var lat = response.coord.lat;

        // $(".icon-output").html("<img src='"+ wIconURL+ "' >");
        // $(".city").text(response.name);  
        // $(".wind").text("Wind Speed: " + response.wind.speed);
        // $(".humidity").text("Humidity: " + response.main.humidity);  
        // $("#lat-long").text(" "+ lat + ", " + long); 
        // $("#temp-output").text(fTemp + " Degrees");
        console.log(response[0].spot_name);
        // $("#spot-name-output").html(response[0].spot_name);

        //create a for loop to display the info of every spot
        for (i=0;i<response.length;i++){
            var spotName = response[i].spot_name;
            var spotID = response[i].spot_id;
            console.log
            $("#spot-name-output").append("<div class='individual-spot-section' id='spot-section-num-"+i+"'>" + spotName + " #"+ spotID+ " <br>"); 
            // $("#spot-name-output").append("<div class='individual-spot-section' id='spot-section-num-"+i+"'>" + response[i].spot_name + " <br>"); 
        };


        // if (fTemp >= 70){
        //     $("#temp-output").css("color", "orange");
        // };
        // if (fTemp <= 69){
        //     $("#temp-output").css("color", "green");
        // };
        // if (fTemp <= 40){
        //     $("#temp-output").css("color", "blue");
        // };

    });


