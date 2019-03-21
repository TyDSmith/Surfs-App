
//global variables

let userLocation;

let spotArray= [];
let displayedSpots = [];

class Spot {
    constructor(spotId, spotName, spotLat, spotLong, average) {
        this.spotId = spotId;
        this.spotLat = spotLat;
        this.spotLong = spotLong;
        this.spotName = spotName;
        this.average = average;
    }
}

function orderObjects () {
    console.log("called")
    spotArray.sort(function (a, b) {
        return a.distance - b.distance;

      });
    //   console.log(spotArray)
      displaySpotCards();

}

//load all the objects


//this is to display the card for each spot, might want to put this in the findNearSpots for loop instead
function displaySpotCards(spotID){
    // for(i=0;i< response[i].length; i++){
    //     //display
    //     styleSpotCard();
    // }
};


//this is to display the card for each spot, might want to put this in the findNearSpots for loop instead

function displaySpotCards(){

        for(i=0; i < 10; i++){
            spotName= spotArray[i].spotName;
            spot = spotArray[i].spotId;
         
            var singleCardDiv = "<div class='singleSurfSpotCard'>";
            var singleCardDivRowOne = "<div class='cardRowOne' id='card-spotid-" + spot + "'>";
            var singleCardNameOutput = "<div class='spot-name-output'>"+spotName;
            // var singleCardSpotConditions = spotArray[i].spotConditions;
            var spotConditionsCardDiv = "<div class='spot-conditions-card-div'> <span class='spot-conditions-tag tag-fair'>" +"conditions<span>";
            var closeDiv = "</div>";


            $(".surfSpotsList").append(singleCardDiv + singleCardDivRowOne  + singleCardNameOutput + closeDiv + closeDiv + spotConditionsCardDiv + closeDiv);
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
    orderObjects();
}

let position = 0

function averageHeightPerHour (callback){
    function myFunc(){
        position++
        if(position == spotArray.length){
            console.log("run find distances")
            findDistances();
        }
    }
    for(x=0; x < spotArray.length; x++){
        let spot = spotArray[position].spotId
        $.ajax({
            url: "http://api.spitcast.com/api/spot/forecast/"+ spot + "/",
            method: "GET"
            }).then(function(response){
                var conditionArray = []
                for(i = 0; i < response.length; i++){
                    let status = response[i].size_ft
                    conditionArray.push(status)
                }
                spotArray[position].sizeArray = conditionArray
                myFunc();
            });
    }
}

function createSpotObjects () {
    $.ajax({
        url: "http://api.spitcast.com/api/spot-forecast/search",
        method: "GET"
        }).then(function(response) {
            console.log(response)
            for(i = 0; i < response.length; i++){
                var average = response[i].average.size;
                var spotName = response[i].spot_name;
                var spotId = response[i].spot_id;
                var spotLat = response[i].coordinates[1]
                var spotLong = response[i].coordinates[0]

                spotArray[i] = new Spot(spotId, spotName, spotLat, spotLong, average)
            }
            averageHeightPerHour(findDistances);
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
            createSpotObjects();
        });

}





function surfSetup(){
    stealTheirLocation();
    
    setTimeout(createChart, 500);
}


//show relevent content when button is pushed


// TY - try to get hourly size_ft

function getHourlySpotConditions(){
    
};



function createChart(){

    // set the data
    var spot = spotArray;
    console.log(spot);
    console.log(spot[0].average);

    var data = {
        header: ["Name", "Surf Height"],
        rows: [
            ["6AM", spot[0].average],
            ["7AM", spot[0].average],
            ["8AM", 4],
            ["9AM", 5],
            ["10AM", 4.6],
            ["11AM", 5.5],
            ["12PM", 4]
            
    ]};


    // create the chart
   var chart = anychart.column();

    // add data
    chart.data(data);

    // set the chart title
    chart.title("Surf Height");

    // draw
    chart.container("chartContainer");
    chart.draw();
}


// function createWindChart(){

//     // set the data
//     var spot = spotArray;

//     var data = {
//         header: ["Name", "Wind Direction"],
//         rows: [
//             ["6AM", 150],
//             ["7AM", 150],
//             ["8AM", 140],
//             ["9AM", 145],
//             ["10AM", 150],
//             ["11AM", 155],
//             ["12PM", 160]
            
//     ]};


//     // create the wind chart
//    var chart = anychart.column();

//     // add data
//     chart.data(data);

//     // set the chart title
//     chart.title("Wind Information");

//     // draw
//     chart.container("containerWind");
//     chart.draw();
// }
