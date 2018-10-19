import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class Home extends Component {

	constructor(props) {
		super(props)
		this.state = {
			search: '',
		}
	}

	componentDidMount() {
		axios.get('/random/').then((res) => {
			let array = res.data;
			let random = array[Math.floor(Math.random()*array.length)];
			this.setState({
				search: random,
			});
			console.log(this.state.search);
		});
	};

	render() {
		if(!this.state.search) {
			return (
				<div className="random">
					<img className="hamster" alt='hamsterWheel' src="https://78.media.tumblr.com/dd65855ebbfe4039f1ec3eef2697d7d2/tumblr_nzq9c6DFaY1t2xc4mo2_r1_1280.gif" height="200" width="200"/>
				</div>
			)
		}
		else {
			return (
				<div className="random">
					<div id="movie-display">
							<img className="poster" alt={this.state.search.title} src={this.state.search.poster} />
							<h1>{this.state.search.title}</h1>
							<p>Date of Release: {this.state.search.release}</p>
							<p>Rated: {this.state.search.rating} {" "} || {" "}  Runtime: {this.state.search.runtime}</p>
							<p>Directed by: {this.state.search.directed} {" "} || {" "} Actors: {this.state.search.actors}</p>
							<p>Plot: {this.state.search.plot}</p>
							<p>Awards: {this.state.search.awards}</p>
							<p>MetaScore: {this.state.search.metaScore} {" "} || {" "} Imdb Rating: {this.state.search.imdbRating}</p>
						</div>
				</div>
			)
		}
		
	}
}

// const Home = props => {
// 	if (props.user) {
// 		return (
// 			<div className="Home">

// 			</div>
// 		)
// 	} else {
// 		return (
// 			<div className="Home">

// 			</div>
// 		)
// 	}
// }

export default Home;