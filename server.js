'use strict';

const express = require('express'); // import express
const server = express();
const cors = require('cors');
require('dotenv').config();


const weatherData = require('./data/weather.json');
server.use(cors()); // the server can take any req from any client

const PORT = process.env.PORT;




//http:localhost:3003/weather?lat=31.95&lon=35.91&searchQuery=Amman





    server.get('/weather', (req, res) => {
        const lat = Number(req.query.lat);
        const lon = Number(req.query.lon);
        const cityName = req.query.searchQuery;

        const weatherInfo = weatherData.find(item => {
            if (((lat === item.lat) && (lon === item.lon)) && (cityName === item.city_name)) {
                return true;
            }

            else {

                return '';

            }
        })


        if (weatherInfo) {
            res.send(wetherforcastobject(weatherInfo))
        }

        else {

            res.status(404).send('city not found');

        }
    })

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



    server.listen(PORT, () => {
        console.log(`listening To PORT = ${PORT}`);
    })




