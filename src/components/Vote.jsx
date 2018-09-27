import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import '../App.css';

class Vote extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searched: false,
            ready: false,
            viewers: '',
            voting: false,
            search: '',
            year: '',
            movie: '',
            choice1: '',
            choice2: '',
            choice3: '',
            choice4: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSearch(event) {
        event.preventDefault();
        this.setState({
            search: '',
        });
        let queryUrl = `https://www.omdbapi.com/?t=${this.state.movie}&y=${this.state.year}&plot=short&apikey=trilogy`;
        console.log("HTTPS is now active!");    

        axios.get(queryUrl).then((res) => {
            console.log(res);
            this.setState({
                movie: '',
                year: '',
                search: res,
                searched: true
            });
        });
    };

    handleAdd(event) {
        if(!this.state.choice1) {
            this.setState({
                choice1: this.state.search,
                search: '',
                searched: false
            });
        }
        else if(!this.state.choice2) {
            this.setState({
                choice2: this.state.search,
                search: '',
                searched: false
            });
        }
        else if(!this.state.choice3) {
            this.setState({
                choice3: this.state.search,
                search: '',
                searched: false
            });
        }
        else{
            this.setState({
                choice4: this.state.search,
                search: '',
                searched: false,
                ready: true
            });
        }
    };

    handleVote(event) {
        this.setState({
            voting: true
        });
    };

    render() {
        if(this.state.ready === true){
            return(
                <div>
                    <form>
                        <input
                        type="text"
                        name="viewers"
                        value={this.state.viewers}
                        onChange={this.handleChange}
                        />
                        {" "}
                        <button
                        onClick={this.handleVote}
                        disabled={!(this.state.viewers)}
                        >Vote!</button>
                    </form>
                </div>
            )
        }
        else if (this.state.voting === true) {
            return(
                <div className="grid">
                    <div className="option1">
                        <img className="optionPoster" src={this.state.choice1.data.Poster}/>
                        <h4>{this.state.choice1.data.Title}</h4>
                        <button onClick={this.handleCastVote}>Cast Vote</button>
                    </div>

                    <div className="option2">
                    <img className="optionPoster" src={this.state.choice2.data.Poster}/>
                        <h4>{this.state.choice2.data.Title}</h4>
                        <button onClick={this.handleCastVote}>Cast Vote</button>
                    </div>

                    <div className="option3">
                    <img className="optionPoster" src={this.state.choice3.data.Poster}/>
                        <h4>{this.state.choice3.data.Title}</h4>
                        <button onClick={this.handleCastVote}>Cast Vote</button>
                    </div>

                    <div className="option4">
                    <img className="optionPoster" src={this.state.choice4.data.Poster}/>
                        <h4>{this.state.choice4.data.Title}</h4>
                        <button onClick={this.handleCastVote}>Cast Vote</button>
                    </div>
                </div>
            )
        }
        else if (this.state.searched === false) {
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
        else if (this.state.searched === true) {
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
                    <br />
                    <div id="movie-display">
                    <img className="poster" src={this.state.search.data.Poster} />
                        <h1>Title: {this.state.search.data.Title}</h1>
                        <p>Date of Release: {this.state.search.data.Released}</p>
                        <p>Rated: {this.state.search.data.Rated}</p>
                        <p>Runtime: {this.state.search.data.Runtime}</p>
                        <p>MetaScore: {this.state.search.data.Metascore}</p>
                        <p>Imdb Rating: {this.state.search.data.imdbRating}</p>
                        <p>Plot: {this.state.search.data.Plot}</p>
                        <br />
                        <button
                        onClick={this.handleAdd}
                        disabled={this.state.choice1 && this.state.choice2 && this.state.choice3 && this.state.choice4}
                        >Place in the running</button>
                    </div>
                </div>
            )
        }

    }
}

export default Vote;