
'use strict';
const axios = require('axios');
const weather = {}





  weather.getWeatherHandler = async function(req,res) {
    
    const city = req.query.cityname
        const lon = req.query.lon
        const lat = req.query.lat
        const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&${lat}&${lon}&key=${process.env.WEATHER_API_KEY}`;
    
    
        axios
        .get(URL)
        .then(result => {
            console.log('inside promise');
            
            let weatherArray = result.data
            
            res.send(weather.wetherforcastobject(weatherArray));
        })
        .catch(err =>{
            res.send(err);
        })
        console.log('outside promise');

    }



        weather.wetherforcastobject = (weatherobj) => {

        const forcastobj = [];
    
        weatherobj.data.map(element => {
    
            const description = `Low of ${element.low_temp} ,high of ${element.max_temp} with ${element.weather.description} `;
    
            const date = element.datetime;
    
            forcastobj.push(new Forcast(description, date));
    
            console.log(forcastobj);
    
        });
    
        return forcastobj;
    
    };


    
    class Forcast {

        constructor(description, date) {
    
            this.date = date;
            this.description = description;
        }
    }









    module.exports = weather