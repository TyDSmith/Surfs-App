var fTemp = null;
var lat = null;
var long = null;

var spotID = null;

let userLocation;

// Insert API Key if needed (not needed for spitcast)
var APIKey = "";
// Insert URL of API
var queryURL = "http://api.spitcast.com/api/spot-forecast/search";

// Create AJAX call

let spotArray= []

function spot(spotId, spotLat, spotLong){
    this.spotId = spotId;
    this.spotLat = spotLat;
    this.spotLong = spotLong
}

function findDistances (){
    console.log("working")
    console.log(spotArray)
    console.log(spotArray.length)
    for(i = 0; i < spotArray.length; i++){
        console.log(i)
        let distance = haversineDistance(userLocation, spotArray[i])
        spotArray[i].distance = distance;
        console.log(spotArray[i])
    }
}

function findConditions (id) {
    $.ajax({
        url: `http://api.spitcast.com/api/spot/forecast/${id}/`,
        method: "GET"
    }).then(function(response) {
        //console.log(response, "conditions")
        for(i=0; i < response.length; i++){
            //console.log(response[i].shape_full)

        }
    })
}

// function findDistance (place) {
//     $.ajax({
//         url: "https://api.opencagedata.com/geocode/v1/json?q=riverside%2C%20california&key=b0359f420459420d8b88c3125472360e&language=en&pretty=1",
//         method: "GET"
//     }).then(function(response) {
//         let userLatitude = response.results[0].geometry.lat
//         let userLongitude = response.results[0].geometry.Lng
//     })
//     let placeLatitude = place[0];
//     let placeLongitude = place[1];
//     console.log("user " + userLatitude, userLongitude)
//     console.log("place " + placeLatitude, placeLongitude)
// }


function haversineDistance(coords1, coords2, isMiles) {
    function toRad(x) {
      return x * Math.PI / 180;
    }
  
    var lon1 = coords1[1];
    var lat1 = coords1[0];
  
    var lon2 = coords2[1];
    var lat2 = coords2[0];
  
    var R = 6371; // km
  
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
  
    if(isMiles) d /= 1.60934;
  
    return d;
  }


function findAllSpotIds () {

    $.ajax({
        url: "http://api.spitcast.com/api/spot-forecast/search",
        method: "GET"
        }).then(function(response) {

            //console.log(response);
            // console.log(response[0].spot_id);
            // console.log(response[0].average.size_max);
            for(i = 0; i < response.length; i++){
                var average = response[i].average.size;
                var spotName = response[i].spot_name;
                var spotId = response[i].spot_id;
                var spotLat = response[i].coordinates[1]
                var spotLong = response[i].coordinates[0]

                spotArray[i] = new spot(spotId, spotLat, spotLong)
                //console.log(spotArray[i])
                //  console.log(spotName, spot);
            }
            
            for(i = 0; i < response.length; i++){
                var average= response[i].average.size;
                var spotName= response[i].spot_name;
                var spot= response[i].spot_id;
                averageHeightPerHour(spot);

            }
            //console.log(spotArray, "spotArray")
        });
        findDistances();
    }


function averageHeightPerHour (spot){
$.ajax({
    url: "http://api.spitcast.com/api/spot/forecast/"+ spot + "/",

    method: "GET"
    }).then(function(response) {

        for (i=0; i < response.length; i++)
        var nameSpot= response[i].spot_name;
        console.log(nameSpot);
        console.log(spot);
            for(i = 0; i < response.length; i++){
                let answer = response[i].size_ft
                //console.log(answer)
            }
    });
}

//this is to display the card for each spot, might want to put this in the findNearSpots for loop instead
function displaySpotCards(spotID){
    for(i=0;i< response[i].length; i++){
        console.log(spotID);
        //display
        styleSpotCard();
    }
};

function styleSpotCard(spotID){
    //this function will be used to apply styling based on the conditions of each spot
    $("#" + spotID).style(sdfs)

    //if spot conditions == fair ... apply class spot-name-fair
}

function stealTheirLocation () {
    $.ajax({
        url: "http://geoip-db.com/json/",
        method: "GET"
        }).then(function(response) {
            let responseJSON = JSON.parse(response);
            userLocation = [responseJSON.latitude, responseJSON.longitude]
            // console.log(userLocation, "response")
            // console.log(responseJSON);
            // console.log(responseJSON);
            // let userLatitude = responseJSON.latitude;
            $("#yourLocation").text(responseJSON.city+", "+ responseJSON.state);
            displaySpotCards();
        });
}


function surfSetup(){
    stealTheirLocation();
    findNearSpots();
}

//Toggle menu options
$(function() {
    $('.singleSurfSpotCard').click(function(e) {
       e.preventDefault();
       $(this).addClass('active').siblings().removeClass('active');

    });

    $('.singleSurfSpotCard').click(function(e) {
        var spotName = $(this).find('.spot-name-output').text();
        // $('#mainContent').empty();
        $('#mainContent').html("<div class='main-spot-name'>"+spotName+"</div>");
        console.log("click!");
    })
});

//show relevent content when button is pushed

