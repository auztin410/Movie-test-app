import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class Upcoming extends Component {

    constructor(props) {
        super(props)
        this.state = {
            upcoming: [],
            ready: false,
        }
    }

    componentDidMount() {
        // axios.get("/scrape/").then((res) => {
        //     console.log("scrape results");
        //     console.log(res.data);
        //     this.setState({
        //         ready: true,
        //     });
        //     }).catch((err) => console.log(err));

            // if(this.state.ready === true) {
                axios.get("/upcoming/list").then((res) => {
                    this.setState({ upcoming: [...res.data]});
                });
            // }
            // else {
            //     console.log("loading...");
            // }
        };
       
        
        render() {
            if(!this.props.user) {
                return(
                    <div className="upcomingDisplay">
                        No user so no adding to want to see.
                    </div>
                )
            }
            else {
                return(
                    <div className="upcomingDisplay">
                        User detected so allow adding to want to see list.
                    </div>
                )
            }
        }
    }
    
    




export default Upcoming;