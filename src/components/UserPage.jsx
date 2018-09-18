import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class UserPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            wantToSee: [],
            movie: '',
        }
    }

    componentDidMount() {
        if(!this.props.user) {
            console.log("No User");
        }
        else{
            axios.get(`/userlist/${this.props.user._id}`).then((res) => {
                console.log("list of movie id's from user list");
                console.log(res.data);
                this.setState({
                    list: res.data[0].list,
                    wantToSee: res.data[0].wantToSee,
                });
            }).catch((err) => (console.log(err)));
        }
    };

    handleList(movieId) {
        console.log(movieId);
        axios.get(`/movie/${movieId}`).then((res) => {
            console.log("Get movie from click");
            console.log(res.data);
            this.setState({
                movie: res.data[0],
            });
            console.log(this.state.movie);
        }).catch((err) => (console.log(err)));
        
    }

    render() {
        if(!this.props.user) {
            return(
                <div>
                    No user logged in!
                </div>
            )
        }
        else if(!this.state.movie){
            return(
                <div>
                    <h3>Movie List</h3>                  
                        {this.state.list.map(item => (
                            <button value={item.movieId} key={item.movieId} onClick={this.handleList.bind(this, item.movieId)}>{item.title}</button>
                        ))}
                    <h3>Want to see</h3>
                    {this.state.wantToSee.map(item => (
                        <button value={item.movideId} key={item.movideId} onClick={this.handleList.bind(this, item.movieId)}>{item.title}</button>
                    ))}  
            </div> 
            )                       
        }
        else {
            return(
                <div>
                    <h3>Movie List</h3>
                        {this.state.list.map(item => (
                            <button value={item.movieId} key={item.movieId} onClick={this.handleList.bind(this, item.movieId)}>{item.title}</button>
                        ))}
                         <h3>Want to see</h3>
                    {this.state.wantToSee.map(item => (
                        <button value={item.movideId} key={item.movideId} onClick={this.handleList.bind(this, item.movieId)}>{item.title}</button>
                    ))}
                    
                    <div id="movie-display">
                        <br/>
                    <img src={this.state.movie.poster} />
                        <h1>Title: {this.state.movie.title}</h1>
                        <p>Date of Release: {this.state.movie.release}</p>
                        <p>Rated: {this.state.movie.rating}</p>
                        <p>Runtime: {this.state.movie.runtime}</p>
                        <p>Directed by: {this.state.movie.director}</p>
                        <p>Actors: {this.state.movie.actors}</p>
                        <p>Plot: {this.state.movie.plot}</p>
                        <p>Awards: {this.state.movie.awards}</p>
                        <p>MetaScore: {this.state.movie.metaScore}</p>
                        <p>Imdb Rating: {this.state.movie.imdbRating}</p>
                    </div>
                                       
                </div>
            )
        }
    }
}

export default UserPage;