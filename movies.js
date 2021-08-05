'use strict';
const axios = require('axios');
const movies = {}
let myMemory = {};

movies.getMoviesHandler = async function  (req,res) {
    const city = req.query.cityname;


    if(myMemory[city] !== undefined) 
    {
      console.log('get the data from the Memory');
      res.send(myMemory[city]);
    }

    else
    { const url = `
        
    https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
    
    
        axios
        .get(url)
        .then(result => {
            console.log('inside promise');
            
            let moviesArray = result.data.results;
            
            res.send(movies.moviesobjectFunction(moviesArray));
        })
        .catch(err =>{
            res.send(err);
        })
        console.log('outside promise');
    }
    
    
    
    
       movies.moviesobjectFunction = (moviesobj) => {
    
        const movieslistObj = [];
    
        moviesobj.map(element => {
    
            myMemory[city] = movieslistObj;

            console.log('get the data from the API');

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

}



       
    
    
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















module.exports = movies