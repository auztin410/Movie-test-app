import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class UserPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
        }
    }

    componentDidMount() {
        if(!this.props.user) {
            console.log("No User");
        }
        else{
            axios.get(`/userlist/${this.props.user._id}`).then((res) => {
                console.log("list of movie id's from user list");
                console.log(res.data[0].list);
            }).catch((err) => (console.log(err)));
        }
    }

    render() {
        if(!this.props.user) {
            return(
                <div>
                    No user logged in!
                </div>
            )
        }
        else {
            return(
                <div>

                </div>
            )
        }
    }
}

export default UserPage;