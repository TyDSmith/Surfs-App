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
        console.log(response, "conditions")
        for(i=0; i < response.length; i++){
            console.log(response[i].shape_full)

        }
    })
}

function findDistance (place) {
    $.ajax({
        url: "https://api.opencagedata.com/geocode/v1/json?q=riverside%2C%20california&key=b0359f420459420d8b88c3125472360e&language=en&pretty=1",
        method: "GET"
    }).then(function(response) {
        let userLatitude = response.results[0].geometry.lat
        let userLongitude = response.results[0].geometry.Lng
    })
    let placeLatitude = place[0];
    let placeLongitude = place[1];
    console.log("user " + userLatitude, userLongitude)
    console.log("place " + placeLatitude, placeLongitude)
}

function findNearSpots () {
    $.ajax({
        url: "http://api.spitcast.com/api/spot-forecast/search",
        method: "GET"
        }).then(function(response) {
            console.log(response);
            findConditions(response[0].spot_id)
            for(i = 0; i < response.length; i++){
                findDistance(response[i].coordinates)
                var spotID = response.spot_id;
                displaySpotCards(spotID);
                console.log(spotID);
                //displaySpotCards();
            }
            

        });
}

findNearSpots()



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
}