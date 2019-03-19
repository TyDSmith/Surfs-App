var fTemp = null;
var lat = null;
var long = null;

var spotID = null;

let userLocation;

let spotArray= [];

class Spot {
    constructor(spotId, spotName, spotLat, spotLong, average) {
        this.spotId = spotId;
        this.spotLat = spotLat;
        this.spotLong = spotLong;
        this.spotName = spotName;
        this.average = average;
    }
}

function averageHeightPerHour (){
    for(i=0; i < spotArray.length; i++){
        spot = spotArray[i].spotId
        $.ajax({
            url: "http://api.spitcast.com/api/spot/forecast/"+ spot + "/",
            method: "GET"
            }).then(function(response){
                console.log(response)
                conditionArray = []
                for(i = 0; i < response.length; i++){
                    let status = response[i].size_ft
                    conditionArray.push(status)
                }
                spotArray[i].sizeArray = conditionArray
                console.log(spotArray[i])
            });
    }
}

//this is to display the card for each spot, might want to put this in the findNearSpots for loop instead
function displaySpotCards(spotID){
    for(i=0;i< response[i].length; i++){
        //console.log(spotID);
        //display
        styleSpotCard();
    }
};

function styleSpotCard(spotID){
    //this function will be used to apply styling based on the conditions of each spot
    $("#" + spotID).style(sdfs)

    //if spot conditions == fair ... apply class spot-name-fair
}

function haversineDistance(coords1, coords2, isMiles) {
    function toRad(x) {
      return x * Math.PI / 180;
    }
    var lat1 = coords1[0];
    var lon1 = coords1[1];

    var lat2 = coords2[0];
    var lon2 = coords2[1];
    
  
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

function findDistances (){
    for(i = 0; i < spotArray.length; i++){
        let distance = haversineDistance([userLocation[0], userLocation[1]], [spotArray[i].spotLat, spotArray[i].spotLong])
        spotArray[i].distance = distance;
    }
}

function findAllSpotIds () {
    $.ajax({
        url: "http://api.spitcast.com/api/spot-forecast/search",
        method: "GET"
        }).then(function(response) {
            for(i = 0; i < response.length; i++){
                var average = response[i].average.size;
                var spotName = response[i].spot_name;
                var spotId = response[i].spot_id;
                var spotLat = response[i].coordinates[1]
                var spotLong = response[i].coordinates[0]

                spotArray[i] = new Spot(spotId, spotName, spotLat, spotLong, average)
            }
            findDistances();
            averageHeightPerHour();
    });
}

function stealTheirLocation () {
    $.ajax({
        url: "http://geoip-db.com/json/",
        method: "GET"
        }).then(function(response) {
            let responseJSON = JSON.parse(response);
            userLocation = [responseJSON.latitude, responseJSON.longitude]
            $("#yourLocation").text(responseJSON.city+", "+ responseJSON.state);
            findAllSpotIds();
        });
}


function surfSetup(){
    stealTheirLocation()
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