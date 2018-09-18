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
                this.setState({
                    list: res.data[0].list,
                });
            }).catch((err) => (console.log(err)));
        }
    };

    handleList(movieId) {
        console.log(movieId);
        
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
                    <ul>
                        {this.state.list.map(item => (
                            <button value={item.movieId} key={item.movieId} onClick={this.handleList.bind(this, item.movieId)}><li>{item.title}</li></button>
                        ))}
                    </ul>
                                       
                </div>
            )
        }
    }
}

export default UserPage;