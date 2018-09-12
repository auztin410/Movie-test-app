import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import '../App.css';

class Search extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            movie: '',
            year: '',
            props: '',
            search: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
    }
    
    handleSearch(event) {
        let queryUrl = `http://www.omdbapi.com/?t=${this.state.movie}&y=${this.state.year}&plot=short&apikey=trilogy`;

        let image = `https://api.themoviedb.org/3/search/movie?api_key=8fa64e2647c4daa2d8b345906657ce66&query=${this.state.movie}`

        // axios.get(image).then((res) => {
        //     console.log("image");
        //     console.log(res);
        //     document.body.style.backgroundRepeat = "no-repeat";
        //     document.body.style.backgroundSize= "cover";
        //     document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${res.data.results[0].poster_path})`
        // });

        axios.get(queryUrl).then((res) => {
            console.log(res);
            this.setState({
                movie: '',
                year: '',
                search: res,
            });
        });

        console.log('props');
        console.log(this.props.user.local.username);
        
    }

    render() {
        if (this.state.search) {
            return (
                <div className="Search">
                    {/* <p>Current User:</p>
                    <p>{this.props.user.local.username}</p> */}
                <form>
                    <input
                    type="text"
                    name="movie"
                    value={this.state.movie}
                    onChange={this.handleChange}
                    />
                    {" "}
                    <FontAwesomeIcon icon="search" onClick={this.handleSearch} />
                </form>
                <br/>
                <div id="movie-display">
                    <img src={this.state.search.data.Poster}/>
                    <h1>Title: {this.state.search.data.Title}</h1>
                    <p>Date of Release: {this.state.search.data.Released}</p>
                    <p>Rated: {this.state.search.data.Rated}</p>
                    <p>Runtime: {this.state.search.data.Runtime}</p>
                    <p>Directed by: {this.state.search.data.Director}</p>
                    <p>Actors: {this.state.search.data.Actors}</p>
                    <p>Plot: {this.state.search.data.Plot}</p>
                    <p>Awards: {this.state.search.data.Awards}</p>
                    <p>MetaScore: {this.state.search.data.Metascore}</p>
                    <p>Imdb Rating: {this.state.search.data.imdbRating}</p>
                    <br />
                    <button>Add to list</button> {" "} <button>Want to see</button>
                </div>
                
                </div>
            )
        } 
        else if(this.state.search && this.props.user.local.username) {
            return (
                <div className="Search">
                    {/* <p>Current User:</p>
                    <p>{this.props.user.local.username}</p> */}
                <form>
                    <input
                    type="text"
                    name="movie"
                    value={this.state.movie}
                    onChange={this.handleChange}
                    />
                    {" "}
                    <FontAwesomeIcon icon="search" onClick={this.handleSearch} />
                </form>
                <br/>
                <div id="movie-display">
                    <img src={this.state.search.data.Poster}/>
                    <h1>Title: {this.state.search.data.Title}</h1>
                    <p>Date of Release: {this.state.search.data.Released}</p>
                    <p>Rated: {this.state.search.data.Rated}</p>
                    <p>Runtime: {this.state.search.data.Runtime}</p>
                    <p>Directed by: {this.state.search.data.Director}</p>
                    <p>Actors: {this.state.search.data.Actors}</p>
                    <p>Plot: {this.state.search.data.Plot}</p>
                    <p>Awards: {this.state.search.data.Awards}</p>
                    <p>MetaScore: {this.state.search.data.Metascore}</p>
                    <p>Imdb Rating: {this.state.search.data.imdbRating}</p>
                </div>
                
                </div>
            )
        } else {
            return (
                <div className="Search">
                    <form>
                    <input
                    type="text"
                    name="movie"
                    value={this.state.movie}
                    onChange={this.handleChange}
                    />
                    {" "}
                    <FontAwesomeIcon icon="search" onClick={this.handleSearch} />
                </form>
                              
                </div>
            )
        }
        
    }
    
}

export default Search;