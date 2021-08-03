'use strict';

const express = require('express'); // import express
const server = express();
const cors = require('cors');
require('dotenv').config();

const axios = require('axios');

// const weatherData = require('./data/weather.json');
server.use(cors()); // the server can take any req from any client

const PORT = process.env.PORT;




//http:localhost:3003/getWeather?lat=31.95&lon=35.91&cityname=Amman

server.get('/getWeather',getWeatherHandler);

async function  getWeatherHandler(req,res) {
const city = req.query.cityname
    const lon = req.query.lon
    const lat = req.query.lat
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&${lat}&${lon}&key=${process.env.WEATHER_API_KEY}`;


    axios
    .get(URL)
    .then(result => {
        console.log('inside promise');
        
        let weatherArray = result.data
        
        res.send(wetherforcastobject(weatherArray));
    })
    .catch(err =>{
        res.send(err);
    })
    console.log('outside promise');
}




const wetherforcastobject = (weatherobj) => {

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




//http:localhost:3003/movies?cityname=Amman
server.get('/movies',getMoviesHandler);

async function  getMoviesHandler(req,res) {
const city = req.query.cityname;
    
    const url = `
    
https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;


    axios
    .get(url)
    .then(result => {
        console.log('inside promise');
        
        let moviesArray = result.data.results;
        
        res.send(moviesobjectFunction(moviesArray));
    })
    .catch(err =>{
        res.send(err);
    })
    console.log('outside promise');
}




const moviesobjectFunction = (moviesobj) => {

    const movieslistObj = [];

    moviesobj.map(element => {

        const title = element.title;


        const overview = element.overview


        const average_votes = element.vote_average

        const total_votes = element.vote_count


        const image_url = process.env.imgurl+element.poster_path


        const popularity = element.popularity


        const released_on = element.release_date


        movieslistObj.push(new Movies(title, overview, average_votes,total_votes, image_url,popularity, released_on ));

        console.log(movieslistObj);

    });

    return movieslistObj;

};


class Movies {

    constructor(title, overview, average_votes,total_votes, image_url,popularity, released_on) {

        this.title = title;
        this.overview = overview;
        this.average_votes = average_votes;
        this.total_votes = total_votes ;
        this.image_url = image_url ; 
        this.popularity = popularity;
        this.released_on = released_on
    }
}






    server.listen(PORT, () => {
        console.log(`listening To PORT = ${PORT}`);
    })




   

   
