import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import '../App.css';

class Voting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            search: '',
            begin: true,
        }
    }

    handleSearch(event) {
        event.preventDefault();
        this.setState({
            search: '',
            searched: false,
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

    render() {
        if (this.state.begin === true) {
            return (
                <div>
                    <h1>Have a group of friends and can't decide on a movie?</h1>
                    <h2>Here let me help.</h2>
                    <br />
                    <h3>How many movies are you in the running?</h3>
                    <form>
                        <select>
                            <option value="">None</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </form>
                    <h3>Great and how many people will be voting?</h3>
                    <form>
                        <select>
                            <option value="">None</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </form>
                    <h3>And finally how would you like decide the winner?</h3>
                    <form>
                        <select>
                            <option value="majority">Majority Wins</option>
                            <option value="lottery">Lottery Vote</option>
                            <option value="random">Random</option>
                        </select>
                    </form>
                </div>
            )
        }
    }
}