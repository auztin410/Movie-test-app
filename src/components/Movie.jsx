import React from 'react';

const Movie = props => {
   <div>
       <div id="movie-display">
                    <img src={props.search.data.Poster}/>
                    <h1>Title: {props.search.data.Title}</h1>
                    <p>Date of Release: {props.search.data.Released}</p>
                    <p>Rated: {props.search.data.Rated}</p>
                    <p>Runtime: {props.search.data.Runtime}</p>
                    <p>Directed by: {props.search.data.Director}</p>
                    <p>Actors: {props.search.data.Actors}</p>
                    <p>Plot: {props.search.data.Plot}</p>
                    <p>Awards: {props.search.data.Awards}</p>
                    <p>MetaScore: {props.search.data.Metascore}</p>
                    <p>Imdb Rating: {props.search.data.imdbRating}</p>
                </div>
   </div>
}

export default Movie;