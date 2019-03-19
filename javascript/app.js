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
                // console.log(response)
                conditionArray = []
                for(i = 0; i < response.length; i++){
                    let status = response[i].size_ft
                    conditionArray.push(status)
                }
                spotArray[i].sizeArray = conditionArray
                // console.log(spotArray[i])
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
            console.log(spotArray)
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
            displaySpotCards();

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
        $('#mainContent').html("<div class='main-spot-name'>"+spotName+"</div>");
        
    })
});


//show relevent content when button is pushed



// Charting functionality

 anychart.onDocumentReady(function() {

        // anychart.theme(anychart.themes.darkEarth);
    
    // set the data
    var data = {
        header: ["NAME", "Surf Height"],
        rows: [
            ["12AM", 3],
            ["1AM", 5],
            ["2AM", 4],
            ["3AM", 5],
            ["4AM", 4.6],
            ["5AM", 5.5],
            ["6AM", 4.3],
            ["7AM", 4.3],
            ["8AM", 4.3],
            ["9AM", 4.3],
            ["10AM", 4.3],
            ["11AM", 4.3],
            ["12PM", 4.3],
            ["1PM", 4.3],
            ["2PM", 4.3],
            ["3PM", 4.3],
            ["4PM", 4.3],
            ["5PM", 4.3],
            ["6PM", 4.3],
            ["7PM", 4.3],
            ["8PM", 4.3],
            ["9PM", 4.3],
            ["10PM", 4.3],
            ["11PM", 4.3],
    ]};

    // create the chart
   var chart = anychart.column();

    // add data
    chart.data(data);

    // set the chart title
    chart.title("Surf Height");

  // draw
  chart.container("container");
  chart.draw();
 });


