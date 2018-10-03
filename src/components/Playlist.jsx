import React, { Component } from  'react';
import axios from 'axios';
import '../App.css';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Playlist extends Component {
constructor(props) {
    super(props);
    this.state = {
        playlists: '',
        display: '',
        newPlaylist: '',
        props: '',
    };

    this.handlePlaylist = this.handlePlaylist.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewPlaylist = this.handleNewPlaylist.bind(this);
    console.log("user");
    console.log(props);
}

componentDidMount() {
    if(!this.props.user) {
        console.log("No User");
    }
    else{
        axios.get(`/playlists/${this.props.user._id}`)
        .then((res) => {
            this.setState({
                playlists: res.data,
            });
        }).catch((err) => (console.log(err)));
    }
};

handlePlaylist(playlistId) {
    console.log(playlistId);
    this.setState({
        display: '',
    });
    axios.get(`/playlist/${playlistId}`).then((res) => {
        console.log("getting all movies from specific playlist");
        console.log(res.data);
        let array = [];
        res.data.map(item => (
            array.push(item.movie)
        ));
        console.log(array);
        this.setState({
            display: array,
        });  
    }).catch((err) => (console.log(err)));
};

handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
};

handleNewPlaylist(event) {
    event.preventDefault();
    console.log("props user");
    console.log(this.props.user._id);
    axios.post("/playlist/", {
        user: this.props.user._id,
        name: this.state.newPlaylist,
    }).then((res) => {
        axios.get(`/playlists/${this.props.user._id}`)
        .then((res) => {
            this.setState({
                playlists: res.data,
                newPlaylist: '',
            });
        }).catch((err) => (console.log(err)));
    }).catch((err) => console.log(err));
    
};


render() {
    

    const data = this.state.display;

    console.log("state playlists");
    console.log(this.state.playlists);

    const columns=[{
        
        Header: "Movie List",
        columns: [
          {
            Header: "Title",
            accessor: "title"
          },
          {
            Header: "Run Time",
            accessor: "runtime"
          },
          {
              Header: "Rating",
              accessor: "rating"
          },
          {
              Header: "Directed by",
              accessor: "directed"
          },
          {
              Header: "Genres",
              accessor: "genre"
          }
        ]
      
    }]

    if(!this.state.display && !this.state.playlists) {
        return(
            <div className="playlist">
                <p id="movie-display">Loading...</p>
            </div>
        )
    }
    else if(!this.state.display) {
        return(
            <div className="playlist">
                {this.state.playlists.map(item => (
                    <button className="playlist-buttons" value={item._id} key={item._id} onClick={this.handlePlaylist.bind(this, item._id)}>{item.name}</button>
                ))}
                <form>
                        <p id="movie-display">Create a new playlist</p>
                        <input
                        type="text"
                        name="newPlaylist"
                        value={this.state.newPlaylist}
                        onChange={this.handleChange}
                        />
                        {" "}
                        <button onClick={this.handleNewPlaylist}>Create New Playlist</button>
                    </form>
            </div>
        )
    }
    else if(this.state.display) {
        return (
            <div className="playlist">
                <ReactTable
                data={data}
                columns={columns}
                />
            </div>
        )
    }
    else {
        return (
            <div className="playlist">
                You dun broke it.
            </div>
        )
    }
}
}

export default Playlist;