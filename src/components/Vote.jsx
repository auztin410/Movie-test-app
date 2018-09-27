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
            savedViewers: '',
            voting: false,
            search: '',
            year: '',
            movie: '',
            choice1: '',
            choice2: '',
            choice3: '',
            choice4: '',
            voteChoice1: 0,
            voteChoice2: 0,
            voteChoice3: 0,
            voteChoice4: 0,
            votingComplete: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.handleCastVote1 = this.handleCastVote1.bind(this);
        this.handleCastVote2 = this.handleCastVote2.bind(this);
        this.handleCastVote3 = this.handleCastVote3.bind(this);
        this.handleCastVote4 = this.handleCastVote4.bind(this);
        this.handleRecastVote = this.handleRecastVote.bind(this);
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
        event.preventDefault();
        this.setState({
            voting: true,
            ready: false,
            savedViewers: this.state.viewers,
        });
    };

    handleCastVote1(event) {
        this.setState({
            viewers: this.state.viewers -1,
            voteChoice1: this.state.voteChoice1 +1
        });
        if(this.state.viewers === 1) {
            this.setState({
                votingComplete: true
            });
        }
    };

    handleCastVote2(event) {
        this.setState({
            viewers: this.state.viewers -1,
            voteChoice2: this.state.voteChoice2 +1
        });
        if(this.state.viewers === 1) {
            this.setState({
                votingComplete: true
            });
        }
    };

    handleCastVote3(event) {
        this.setState({
            viewers: this.state.viewers -1,
            voteChoice3: this.state.voteChoice3 +1
        });
        if(this.state.viewers === 1) {
            this.setState({
                votingComplete: true
            });
        }
    };

    handleCastVote4(event) {
        this.setState({
            viewers: this.state.viewers -1,
            voteChoice4: this.state.voteChoice4 +1
        });
        if(this.state.viewers === 1) {
            this.setState({
                votingComplete: true
            });
        }
    };

    handleRecastVote(event) {
        this.setState({
            votingComplete: false,
            viewers: this.state.savedViewers,
            voteChoice1: 0,
            voteChoice2: 0,
            voteChoice3: 0,
            voteChoice4: 0,
        });
    };

    render() {
        let Winner
        if( this.state.voteChoice1 > this.state.voteChoice2 && this.state.voteChoice1 > this.state.voteChoice3 && this.state.voteChoice1 > this.state.voteChoice4) {
            Winner = (
                <div>
                    <img src={this.state.choice1.data.Poster} alt={this.state.choice1.data.Title} />
                    <h1>{this.state.choice1.data.Title}</h1>
                </div>
            )
        }
        else if( this.state.voteChoice2 > this.state.voteChoice1 && this.state.voteChoice2 > this.state.voteChoice3 && this.state.voteChoice2 > this.state.voteChoice4){
            Winner = (
                <div>
                    <img src={this.state.choice2.data.Poster} alt={this.state.choice2.data.Title} />
                    <h1>{this.state.choice2.data.Title}</h1>
                </div>
            )
        }
        else if( this.state.voteChoice3 > this.state.voteChoice1 && this.state.voteChoice3 > this.state.voteChoice2 && this.state.voteChoice3 > this.state.voteChoice4){
            Winner = (
                <div>
                    <img src={this.state.choice3.data.Poster} alt={this.state.choice3.data.Title} />
                    <h1>{this.state.choice3.data.Title}</h1>
                </div>
            )
        }
        else if( this.state.voteChoice4 > this.state.voteChoice1 && this.state.voteChoice4 > this.state.voteChoice2 && this.state.voteChoice4 > this.state.voteChoice3){
            Winner = (
                <div>
                    <img src={this.state.choice4.data.Poster} alt={this.state.choice4.data.Title} />
                    <h1>{this.state.choice4.data.Title}</h1>
                </div>
            )
        }
        else{
            Winner = (
                <div>
                    <h4>There was a tie!</h4>
                    <button onClick={this.handleRecastVote}>Recast Vote!</button>
                </div>
            )
        }
        if(this.state.votingComplete === true) {
            return(
                <div id="movie-display">
                    <h1>The Winner Is!</h1>
                        {Winner}
                </div>
            )
        }
        else if (this.state.ready === true){
            return(
                <div className="search">
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
                        >Start Voting!</button>
                    </form>
                </div>
            )
        }
        else if (this.state.voting === true) {
            return(
                <div className="grid">
                    <div className="option1">
                        <img className="optionPoster" src={this.state.choice1.data.Poster} alt={this.state.choice1.data.Title}/>
                        <h4>{this.state.choice1.data.Title}</h4>
                        <button className="castVote" onClick={this.handleCastVote1}>Cast Vote</button>
                    </div>

                    <div className="option2">
                    <img className="optionPoster" src={this.state.choice2.data.Poster} alt={this.state.choice2.data.Title}/>
                        <h4>{this.state.choice2.data.Title}</h4>
                        <button className="castVote" onClick={this.handleCastVote2}>Cast Vote</button>
                    </div>

                    <div className="option3">
                    <img className="optionPoster" src={this.state.choice3.data.Poster} alt={this.state.choice3.data.Title}/>
                        <h4>{this.state.choice3.data.Title}</h4>
                        <button className="castVote" onClick={this.handleCastVote3}>Cast Vote</button>
                    </div>

                    <div className="option4">
                    <img className="optionPoster" src={this.state.choice4.data.Poster} alt={this.state.choice4.data.Title}/>
                        <h4>{this.state.choice4.data.Title}</h4>
                        <button className="castVote" onClick={this.handleCastVote4}>Cast Vote</button>
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