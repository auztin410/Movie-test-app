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
        this.handleAdd = this.handleAdd.bind(this);
        this.handleWantToSee = this.handleWantToSee.bind(this);
        console.log("user");
        console.log(props);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSearch(event) {
        event.preventDefault();
        this.setState({
            search: '',
        });
        let queryUrl = `https://www.omdbapi.com/?t=${this.state.movie}&y=${this.state.year}&plot=short&apikey=trilogy`;
        console.log("HTTPS is now active!");

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



    }

    handleAdd(event) {
        console.log("props");
        console.log(this.props.user._id);
        axios.post("/add/", {
            user: this.props.user._id,
            movieId: this.state.search.data.imdbID,
            title: this.state.search.data.Title
        }).then((res) => {
            console.log("add result");
            console.log(res);
            return axios.post("/movie/", {
                movieId: this.state.search.data.imdbID,
                title: this.state.search.data.Title,
                release: this.state.search.data.Released,
                rating: this.state.search.data.Rated,
                runtime: this.state.search.data.Runtime,
                directed: this.state.search.data.Director,
                actors: this.state.search.data.Actors,
                plot: this.state.search.data.Plot,
                awards: this.state.search.data.Awards,
                metaScore: this.state.search.data.Metascore,
                imdbRating: this.state.search.data.imdbRating,
                poster: this.state.search.data.Poster,
                genre: this.state.search.data.Genre,
            }).then((res) => {
                console.log(res);
                this.setState({
                    search: '',
                }); 
            }).catch((err) => {
                console.log(err);
            });
        });
           
    }

    handleWantToSee(event) {
        axios.post("/wanttosee/", {
            user: this.props.user._id,
            wantToSee: this.state.search.data.imdbID,
            title: this.state.search.data.Title
        }).then((res) => {
            console.log("add to want to see");
            console.log(res);
            return axios.post("/movie/", {
                movieId: this.state.search.data.imdbID,
                title: this.state.search.data.Title,
                release: this.state.search.data.Released,
                rating: this.state.search.data.Rated,
                runtime: this.state.search.data.Runtime,
                directed: this.state.search.data.Director,
                actors: this.state.search.data.Actors,
                plot: this.state.search.data.Plot,
                awards: this.state.search.data.Awards,
                metaScore: this.state.search.data.Metascore,
                imdbRating: this.state.search.data.imdbRating,
                poster: this.state.search.data.Poster,
                genre: this.state.search.data.Genre,    
            }).then((res) => {
                console.log(res);
                this.setState({
                    search: '',
                });
            }).catch((err) => {
                console.log(err);
            });
        });
        
    }

    render() {
        if (!this.state.search && !this.props.user) {
            return (
                <div className="search">
                    <form>
                        <input
                            type="text"
                            name="movie"
                            value={this.state.movie}
                            onChange={this.handleChange}
                        />
                        {" "}
                        <button className="searchButton" onClick={this.handleSearch}><FontAwesomeIcon icon="search" /></button>
                    </form>

                </div>

            )
        }
        else if (!this.state.search && this.props.user) {
            return (
                <div className="search">
                    <form>
                        <input
                            type="text"
                            name="movie"
                            value={this.state.movie}
                            onChange={this.handleChange}
                        />
                        {" "}
                        <button className="searchButton" onClick={this.handleSearch}><FontAwesomeIcon icon="search" /></button>
                    </form>

                </div>

            )
        }
        else if (this.state.search && !this.props.user) {
            return (
                <div className="search">
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
                        <button className="searchButton" onClick={this.handleSearch}><FontAwesomeIcon icon="search" /></button>
                    </form>
                    <br />
                    <div id="movie-display">
                        <img className="poster" src={this.state.search.data.Poster} />
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
        }
        else {
            return (
                <div className="search">
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
                        <button className="searchButton" onClick={this.handleSearch}><FontAwesomeIcon icon="search" /></button>
                    </form>
                    <br />
                    <div id="movie-display">
                        <img className="poster" src={this.state.search.data.Poster} />
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
                        <button onClick={this.handleAdd}>Add to list</button> {" "} <button onClick={this.handleWantToSee}>Want to see</button>
                    </div>

                </div>
            )
        }

    }

}

export default Search;