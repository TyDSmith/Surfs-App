# Surf's App

## Description
A basic web app for checking surf reports and recommending a spot

This app uses the SpitCast API. [Checkout the SpitCast API Documentation](http://www.spitcast.com/api/docs/)

A collaboration between Ty Daniel Smith, Parker Bjur, & Orlando Rangel

### Future Features

* Use user location to find nearby spots
* Account setup for individual users to set favorites

* Frontend
    * input fields
        * day (today defalt)
        * distance willing to drive
    * output fields
        * surf options by color (green-red)

* Backend
    * inputs
        * location
            * lat, long
        * distance
    * outputs 
        * surf height ordered greatest to least
        * an array of objects sorted by height

