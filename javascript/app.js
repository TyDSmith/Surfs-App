var fTemp = null;
var lat = null;
var long = null;

var spotID = null;

// Insert API Key if needed (not needed for spitcast)
var APIKey = "";
// Insert URL of API
var queryURL = "http://api.spitcast.com/api/spot-forecast/search";

// Create AJAX call

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

function calculateDistance (lat1, lat2, lon1, lon2) {
    // var R = 6371e3; // metres
    // var φ1 = lat1 * (Math.PI/180)
    // var φ2 = lat2 * (Math.PI/180)
    // var Δφ = (lat2-lat1) * (Math.PI/180)
    // var Δλ = (lon2-lon1) * (Math.PI/180)

    // var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
    //         Math.cos(φ1) * Math.cos(φ2) *
    //         Math.sin(Δλ/2) * Math.sin(Δλ/2);
    // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    // var distanceInMeters = R * c;
    // console.log(distanceInMeters, "meters")

    // let distanceInMiles = distanceInMeters/1609.344

    // let latLenght = userLat - placeLat
    // let longLength = userLong - placeLong
    // let distance = Math.sqrt((latLenght*latLenght)+(longLength*longLength))
    //let distanceInMiles = distance * 69

    return distanceInMiles
}

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

  console.log(haversineDistance([33.9533,-117.3962],[33.660057,-117.998970]))
console.log(calculateDistance(33.9533,-117.3962,33.660057,-117.998970))

function findNearSpots () {
    $.ajax({
        url: "http://api.spitcast.com/api/spot-forecast/search",
        method: "GET"
        }).then(function(response) {
            // console.log(response);
            // console.log(response[0].spot_id);
            // console.log(response[0].average.size_max);
            for(i = 0; i < response.length; i++){
                var average= response[i].average.size;
                var spotName= response[i].spot_name;
                var spot= response[i].spot_id;
                spotIDCall(spot);
                //  console.log(spotName, spot);
            }
        });
    }

findNearSpots();

function spotIDCall(spot){
// var spotId= $(findNearSpots(spotID));
$.ajax({
    url: "http://api.spitcast.com/api/spot/forecast/"+ spot + "/",
    // url: "http://api.spitcast.com/api/spot/forecast/708/",
    method: "GET"
    }).then(function(response) {
        // for (i=0; i < response.length; i++)
        // spotId= findConditions(response[i].spot_id);
        // console.log(spotId);

        console.log(spot, response);
    });
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
}



function surfSetup(){
    $.ajax({
        url: "http://geoip-db.com/json/",
        method: "GET"
        }).then(function(response) {
            let responseJSON = JSON.parse(response);
            // console.log(responseJSON);
            // let userLatitude = responseJSON.latitude;
            $("#yourLocation").text(responseJSON.city+", "+ responseJSON.state);
        });
}


$(function() {
    $('.singleSurfSpotCard').click(function(e) {
       e.preventDefault();
       $(this).addClass('active').siblings().removeClass('active');
    });
});
