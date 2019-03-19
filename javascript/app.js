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
                conditionArray = []
                for(i = 0; i < response.length; i++){
                    let status = response[i].size_ft
                    conditionArray.push(status)
                }
                spotArray[i].sizeArray = conditionArray
             
            });
            
    }
    displaySpotCards();
}

//this is to display the card for each spot, might want to put this in the findNearSpots for loop instead
function displaySpotCards(){

        for(i=0; i < 4; i++){
            spotName= spotArray[i].spotName;
            spot = spotArray[i].spotId;
            var singleCardDiv = "<div class='singleSurfSpotCard'>";
            var singleCardDivRowOne = "<div class='cardRowOne' id='card-spotid-" + spot + "'>";
            var singleCardNameOutput = "<div class='spot-name-output'>"+spotName;
            var spotConditionsCardDiv = "<div class='spot-conditions-card-div'> <span class='spot-conditions-tag tag-fair'>" +"conditions<span>";
            var closeDiv = "</div>";


            console.log(spotName);
            $(".surfSpotsList").prepend(singleCardDiv + singleCardDivRowOne  + singleCardNameOutput + closeDiv + closeDiv + spotConditionsCardDiv + closeDiv);
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
    stealTheirLocation();
    createChart();  

}

//Toggle menu options
$(function() {
    $('.singleSurfSpotCard').click(function(e) {
       e.preventDefault();
       $(this).addClass('active').siblings().removeClass('active');

    });

    $('.singleSurfSpotCard').click(function(e) {
        var spotName = $(this).find('.spot-name-output').text();
        $('#main-spot-name').html(spotName);
        
    })
});


//show relevent content when button is pushed






function createChart(){

    // set the data
    var spot = spotArray;

    var data = {
        header: ["Name", "Surf Height"],
        rows: [
            ["6AM", 3],
            ["7AM", 5],
            ["8AM", 4],
            ["9AM", 5],
            ["10AM", 4.6],
            ["11AM", 5.5],
            ["12PM", spot[1]]
            
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
}