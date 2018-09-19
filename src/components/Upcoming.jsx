import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class Upcoming extends Component {

    constructor(props) {
        super(props)
        this.state = {
            upcoming: [],
        }
    }

    componentDidMount() {
        axios.get("/scrape/").then((res) => {
            console.log("scrape results");
            console.log(res.data);
        }).catch((err) => console.log(err));
    }
    
    render() {
        if(!this.props.user) {
            return(
                <div>
                    No user so no adding to want to see.
                </div>
            )
        }
        else {
            return(
                <div>
                    User detected so allow adding to want to see list.
                </div>
            )
        }
    }
}



export default Upcoming;