import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class Upcoming extends Component {

    constructor(props) {
        super(props)
        this.state = {
            upcoming: [],
            ready: false,
            user: null,
        }

        this.Shuffle = this.Shuffle.bind(this);
        this.handleScrape = this.handleScrape.bind(this);
        this.handleEmpty = this.handleEmpty.bind(this);
    }

    Shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    componentDidMount() {
        if (!this.state.user) {
            axios.get('/auth/user').then(response => {
                if (!!response.data.user) {
                    console.log('THERE IS A USER')
                    this.setState({
                        loggedIn: true,
                        user: response.data.user
                    })
                } else {
                    this.setState({
                        loggedIn: false,
                        user: null
                    })
                }
            })
        }
        axios.get("/upcoming/list").then((res) => {
            this.setState({
                upcoming: [...res.data]
             });
            this.Shuffle(this.state.upcoming);
            this.setState({
                ready: true,
            });
        });
    };

    handleScrape(event) {
        axios.get("/scrape/").then((res) => {
            console.log("scrape results");
            console.log(res.data);
            }).catch((err) => console.log(err));
    }

    handleEmpty(event) {
        axios.post("/empty/").then((res) => {
            console.log("emptying upcoming movies DB");
        }).catch((err) => console.log(err));
    }


    render() {
        
        if (this.state.ready === false && !this.state.user) {
            return (
                <div className="movie-display">
                    Loading...
                </div>
            )
        }
        else if (!this.state.user && this.state.ready === true) {
            return (
                <div className="upcomingDisplay">
                    <div className="upcoming0">
                        <img className="poster" src={this.state.upcoming[0].link} alt={this.state.upcoming[0].title}/>
                        <h1 className="movie-info" id="upcomingTitle">{this.state.upcoming[0].title}</h1>
                    </div>
                    <div className="upcoming1">
                        <img className="poster" src={this.state.upcoming[1].link} alt={this.state.upcoming[1].title}/>
                        <h1 className="movie-info" id="upcomingTitle">{this.state.upcoming[1].title}</h1>
                    </div>
                    <div className="upcoming2">
                        <img className="poster" src={this.state.upcoming[2].link} alt={this.state.upcoming[2].title}/>
                        <h1 className="movie-info" id="upcomingTitle">{this.state.upcoming[2].title}</h1>
                    </div>
                    <div className="upcoming3">
                        <img className="poster" src={this.state.upcoming[3].link} alt={this.state.upcoming[3].title}/>
                        <h1 className="movie-info" id="upcomingTitle">{this.state.upcoming[3].title}</h1>
                    </div>
                </div>
            )
        }
       else if (this.state.ready === false && this.state.user._id === "5ba3e0f075e8890015c869ad") {
            return (
                <div className="movie-display">
                    Loading...
                    <br />
                <button onClick={this.handleScrape}>Scrape</button>
                {" "}
                <button onClick={this.handleEmpty}>Empty</button>
                    </div>
            )
        }
        else if (this.state.ready === true && this.state.user._id === "5ba3e0f075e8890015c869ad") {
            return (
                <div className="upcomingDisplay">
                <br />
                <button onClick={this.handleScrape}>Scrape</button>
                {" "}
                <button onClick={this.handleEmpty}>Empty</button>
                    <div className="upcoming0">
                        <img className="poster" src={this.state.upcoming[0].link} alt={this.state.upcoming[0].title}/>
                        <h1 className="movie-info" id="upcomingTitle">{this.state.upcoming[0].title}</h1>
                    </div>
                    <div className="upcoming1">
                        <img className="poster" src={this.state.upcoming[1].link} alt={this.state.upcoming[1].title}/>
                        <h1 className="movie-info" id="upcomingTitle">{this.state.upcoming[1].title}</h1>
                    </div>
                    <div className="upcoming2">
                        <img className="poster" src={this.state.upcoming[2].link} alt={this.state.upcoming[2].title}/>
                        <h1 className="movie-info" id="upcomingTitle">{this.state.upcoming[2].title}</h1>
                    </div>
                    <div className="upcoming3">
                        <img className="poster" src={this.state.upcoming[3].link} alt={this.state.upcoming[3].title}/>
                        <h1 className="movie-info" id="upcomingTitle">{this.state.upcoming[3].title}</h1>
                    </div>
                </div>
            )
        }        
        else if (this.state.ready === true) {
            return (
                <div className="upcomingDisplay">
                    <div className="upcoming0">
                        <img className="poster" src={this.state.upcoming[0].link} alt={this.state.upcoming[0].title}/>
                        <h1 className="movie-info" id="upcomingTitle">{this.state.upcoming[0].title}</h1>
                    </div>
                    <div className="upcoming1">
                        <img className="poster" src={this.state.upcoming[1].link} alt={this.state.upcoming[1].title}/>
                        <h1 className="movie-info" id="upcomingTitle">{this.state.upcoming[1].title}</h1>
                    </div>
                    <div className="upcoming2">
                        <img className="poster" src={this.state.upcoming[2].link} alt={this.state.upcoming[2].title}/>
                        <h1 className="movie-info" id="upcomingTitle">{this.state.upcoming[2].title}</h1>
                    </div>
                    <div className="upcoming3">
                        <img className="poster" src={this.state.upcoming[3].link} alt={this.state.upcoming[3].title}/>
                        <h1 className="movie-info" id="upcomingTitle">{this.state.upcoming[3].title}</h1>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    You dun broke it again...
                    </div>
            )
        }
    }
}






export default Upcoming;