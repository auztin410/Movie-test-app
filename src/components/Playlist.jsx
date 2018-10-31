import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import { VictoryPie } from 'victory';

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
            runTimes: {},
            ratings: {},
            directors: {},
            genres: {},
            result: '',
            selected: '',
            user: null,
            doubleCheck: false,
        };

        this.handlePlaylist = this.handlePlaylist.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNewPlaylist = this.handleNewPlaylist.bind(this);
        this.handleDoubleCheck = this.handleDoubleCheck.bind(this);
        this.handleDeletePlaylist = this.handleDeletePlaylist.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDeleteMovie = this.handleDeleteMovie.bind(this);
        console.log("user");
    }

    componentDidMount() {
        axios.get('/auth/user').then(response => {
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
                });
                return axios.get(`/playlists/${this.state.user._id}`)
                .then((res) => {
                    this.setState({
                        playlists: res.data,
                    });
                }).catch((err) => (console.log(err)));
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		});
        
    };

    handleDoubleCheck(event) {
        event.preventDefault();
        this.setState({
            doubleCheck: true,
        });
    };

    handleCancel(event) {
        event.preventDefault();
        this.setState({
            doubleCheck: false,
        });
    };

    handleDeletePlaylist(event) {
        event.preventDefault();
        axios.delete(`playlist/delete/${this.state.selected}`,)
        .then((res) => {
            this.setState({
                selected: '',
                doubleCheck: false,
            });
            console.log("Test delete");
            console.log(res);
        }).catch((err) => console.log(err)); 
        window.location.reload();
    };

    handleDeleteMovie(event) {
        console.log("Delete Movie Button");
        console.log(event);
        axios.delete(`movie/${event._id}/${this.state.selected}`,)
        .then((res) => {
            console.log("Deleted Movie from Playlist!");
            console.log(res);
        }).catch((err) => console.log(err));
        window.location.reload();
    };

    handlePlaylist(event) {
        event.preventDefault();
        this.setState({
            display: '',
        });
        axios.get(`/playlist/${this.state.selected}`).then((res) => {
            console.log("getting all movies from specific playlist");
            console.log(res.data);
            let array = [];
            let directorsArray = [];
            let genresArray = [];
            let runTimesArray = [];
            let ratingsArray = [];
            res.data.map(item => (
                array.push(item.movie),
                directorsArray.push(item.movie.directed),
                genresArray.push(item.movie.genre.split(",")),
                runTimesArray.push(item.movie.runtime),
                ratingsArray.push(item.movie.rating)
            ));

            const genresSplitArray = [].concat(...genresArray);

            console.log("genre split");
            console.log(genresSplitArray);

            const countDirectors = directorsArray.reduce((forGraph, directorsArray) => {
                const current = forGraph.find(item => item.x === directorsArray);
                if (current) {
                    current.y += 1
                } else {
                    forGraph.push({
                        x: directorsArray,
                        y: 1
                    })
                }
                return forGraph
            }, []);

            const countGenres = genresSplitArray.reduce((forGraph, genresSplitArray) => {
                const current = forGraph.find(item => item.x === genresSplitArray);
                if (current) {
                    current.y += 1
                } else {
                    forGraph.push({
                        x: genresSplitArray,
                        y: 1
                    })
                }
                return forGraph
            }, []);


            const countRunTimes = runTimesArray.reduce((forGraph, runTimesArray) => {
                const current = forGraph.find(item => item.x === runTimesArray);
                if (current) {
                    current.y += 1
                } else {
                    forGraph.push({
                        x: runTimesArray,
                        y: 1
                    })
                }
                return forGraph
            }, []);

            
            const countRatings = ratingsArray.reduce((forGraph, ratingsArray) => {
                const current = forGraph.find(item => item.x === ratingsArray);
                if (current) {
                    current.y += 1
                } else {
                    forGraph.push({
                        x: ratingsArray,
                        y: 1
                    })
                }
                return forGraph
            }, []);

        


            this.setState({
                display: array,
                directors: countDirectors,
                genres: countGenres,
                runTimes: countRunTimes,
                ratings: countRatings,
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
        axios.post("/playlist/", {
            user: this.state.user._id,
            name: this.state.newPlaylist,
        }).then((res) => {
            axios.get(`/playlists/${this.state.user._id}`)
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

        const columns = [{

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
                },
                {
                    Header: "",
                    Cell: row => (
                        <div>
                            <button onClick={() => this.handleDeleteMovie(row.original)}>Delete</button>
                        </div> )
                  }
            ]

        }]

        if (!this.state.display && !this.state.playlists) {
            return (
                <div className="playlist">
                    <p id="movie-display">Loading...</p>
                </div>
            )
        }
        else if (!this.state.display && this.state.doubleCheck === true) {
            return (
                <div className="playlist">
                    <form>
                        <select name="selected" onChange={this.handleChange}>
                        <option value="">None Selected</option>
                    {this.state.playlists.map(item => (
                        <option value={item._id}>{item.name}</option>
                    ))}
                    </select>
                    {" "}
                    <button onClick={this.handlePlaylist}>Load Playlist</button>
                    <br/>
                    <br/>
                    <div id="movie-display">Are you sure you wish to delete this playlist?</div>
                    {" "}
                    <button onClick={this.handleDeletePlaylist}>Yes</button>
                    {" "}
                    <button onClick={this.handleCancel}>No</button>
                    </form>
                    <form>
                        <p id="movie-display">Create a new playlist</p>
                        <input
                            type="text"
                            name="newPlaylist"
                            value={this.state.newPlaylist}
                            onChange={this.handleChange}
                        />
                        {" "}
                        <button onClick={this.handleNewPlaylist} disabled={!this.state.newPlaylist}>Create New Playlist</button>
                    </form>
                </div>
            )
        }
        else if (this.state.display && this.state.doubleCheck === true) {
            return (
                <div className="playlist">
                    <form>
                        <select name="selected" onChange={this.handleChange}>
                        <option value="">None Selected</option>
                    {this.state.playlists.map(item => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                    ))}
                    </select>
                    {" "}
                    <button onClick={this.handlePlaylist}>Load Playlist</button>
                    <br/>
                    <br/>
                    <div id="movie-display">Are you sure you wish to delete this playlist?</div>
                    {" "}
                    <button onClick={this.handleDeletePlaylist}>Yes</button>
                    {" "}
                    <button onClick={this.handleCancel}>No</button>
                    </form>
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
                    <ReactTable
                        data={data}
                        columns={columns}
                    />
                    <br />
                    <div className="contain-pie">
                        <VictoryPie
                            responsive={false}
                            height={150}
                            width={150}
                            data={this.state.directors}
                            style={{ labels: { fill: "white", fontSize: 3 } }}
                        />
                        <br />
                        <VictoryPie
                            responsive={false}
                            height={150}
                            width={150}
                            data={this.state.genres}
                            style={{ labels: { fill: "white", fontSize: 3 } }}
                        />
                        <br />
                        <VictoryPie
                            responsive={false}
                            height={150}
                            width={150}
                            data={this.state.runTimes}
                            style={{ labels: { fill: "white", fontSize: 3 } }}
                        />
                        <br />
                        <VictoryPie
                            responsive={false}
                            height={150}
                            width={150}
                            data={this.state.ratings}
                            style={{ labels: { fill: "white", fontSize: 3 } }}
                        />
                    </div>
                </div>
            )
        }
        else if (!this.state.display) {
            return (
                <div className="playlist">
                    <form>
                        <select name="selected" onChange={this.handleChange}>
                        <option value="">None Selected</option>
                    {this.state.playlists.map(item => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                    ))}
                    </select>
                    {" "}
                    <button onClick={this.handlePlaylist}>Load Playlist</button>
                    {" "}
                    <button onClick={this.handleDoubleCheck}>Delete Playlist</button>
                    </form>
                    <form>
                        <p id="movie-display">Create a new playlist</p>
                        <input
                            type="text"
                            name="newPlaylist"
                            value={this.state.newPlaylist}
                            onChange={this.handleChange}
                        />
                        {" "}
                        <button onClick={this.handleNewPlaylist} disabled={!this.state.newPlaylist}>Create New Playlist</button>
                    </form>
                </div>
            )
        }
        else if (this.state.display) {
            return (
                <div className="playlist">
                    <form>
                        <select name="selected" onChange={this.handleChange}>
                        <option value="">None Selected</option>
                    {this.state.playlists.map(item => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                    ))}
                    </select>
                    {" "}
                    <button onClick={this.handlePlaylist}>Load Playlist</button>
                    {" "}
                    <button onClick={this.handleDoubleCheck}>Delete Playlist</button>
                    </form>
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
                    <ReactTable
                        data={data}
                        columns={columns}
                    />
                    <br />
                    <div className="contain-pie">
                        <VictoryPie
                            responsive={false}
                            height={150}
                            width={150}
                            data={this.state.directors}
                            style={{ labels: { fill: "white", fontSize: 3 } }}
                        />
                        <br />
                        <VictoryPie
                            responsive={false}
                            height={150}
                            width={150}
                            data={this.state.genres}
                            style={{ labels: { fill: "white", fontSize: 3 } }}
                        />
                        <br />
                        <VictoryPie
                            responsive={false}
                            height={150}
                            width={150}
                            data={this.state.runTimes}
                            style={{ labels: { fill: "white", fontSize: 3 } }}
                        />
                        <br />
                        <VictoryPie
                            responsive={false}
                            height={150}
                            width={150}
                            data={this.state.ratings}
                            style={{ labels: { fill: "white", fontSize: 3 } }}
                        />
                    </div>
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