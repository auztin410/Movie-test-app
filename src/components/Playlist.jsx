import React from  'react';
import axios from 'axios';
import '../App.css';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Playlist extends React.Component {
constructor() {
    super();
    this.state = {
        playlists: '',
        display: '',
        array: [],
    };

    this.handlePlaylist = this.handlePlaylist.bind(this);
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
        this.setState({
            display: array,
        });
        console.log("movie only in display");
        console.log(this.state.display);
        
    }).catch((err) => (console.log(err)));
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
            <div>
                Loading...
            </div>
        )
    }
    else if(!this.state.display) {
        return(
            <div>
                {this.state.playlists.map(item => (
                    <span className="buttons" value={item._id} key={item._id} onClick={this.handlePlaylist.bind(this, item._id)}>{item.name}</span>
                ))}
            </div>
        )
    }
    else if(this.state.display) {
        return (
            <div>
                <ReactTable
                data={data}
                columns={columns}
                />
            </div>
        )
    }
    else {
        return (
            <div>
                You dun broke it.
            </div>
        )
    }
}
}

export default Playlist;