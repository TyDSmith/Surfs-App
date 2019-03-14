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
    let placeLatitude = place[0];
    let placeLongitude = place[1];
    console.log(placeLatitude, placeLongitude)
}

function findNearSpots () {
    $.ajax({
        url: queryURL,
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