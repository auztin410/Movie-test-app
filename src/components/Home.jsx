import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactAutocomplete from 'react-autocomplete';
import axios from 'axios';
import '../App.css';

class Home extends Component {

	constructor(props) {
		super(props)
		this.state = {
			random: null,
			search: null,
			movie: '',
			year: '',
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		axios.get('/random/').then((res) => {
			let array = res.data;
			let random = array[Math.floor(Math.random()*array.length)];
			this.setState({
				random,
			});
			console.log(this.state.random);
		});
	};

	handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
	};
	
	handleSearch(event) {
        event.preventDefault();
        this.setState({
            value: '',
        });
        let queryUrl = `https://www.omdbapi.com/?t=${this.state.movie}&y=${this.state.year}&plot=short&apikey=trilogy`;
        console.log("HTTPS is now active!");

        axios.get(queryUrl).then((res) => {
            console.log(res);
            this.setState({
                movie: '',
                year: '',
                search: res,
            });
            if (this.state.search.data.Response === "False") {
                console.log("no movie found, will not add to autocomplete");
            }
            else {
                axios.post("/autocomplete/", {
                    movieId: this.state.search.data.imdbID,
                    title: this.state.search.data.Title,
                    year: this.state.search.data.Released
                }).then((res) => {
                    console.log("autocomplete add");
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
	};
	
	handleUpVote(movieId) {
		console.log(`Up Voting: ${movieId}`);
	};

	handleDownVote(movieId) {
		console.log(`Down Voting: ${movieId}`);
	};

	render() {
		if(!this.state.random) {
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
							<img className="poster" alt={this.state.random.title} src={this.state.random.poster} />
							<h1 className="movie-info">{this.state.random.title}</h1>
							<p className="movie-info">Date of Release: {this.state.random.release}</p>
							<p className="movie-info">Rated: {this.state.random.rating} {" "} || {" "}  Runtime: {this.state.random.runtime}</p>
							<p className="movie-info">Directed by: {this.state.random.directed} {" "} || {" "} Actors: {this.state.random.actors}</p>
							<p className="movie-info">Plot: {this.state.random.plot}</p>
							<p className="movie-info">Awards: {this.state.random.awards}</p>
							<p className="movie-info">MetaScore: {this.state.random.metaScore} {" "} || {" "} Imdb Rating: {this.state.random.imdbRating}</p>
							{(this.props.user)
							?
							<div>
								<div className="search">
                    <form>
                    {/* <ReactAutocomplete
                            items={
                                this.state.suggestions.map(item =>(
                                    { id: item.title, label: item.title}
                                ))
                            }
                            shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                            getItemValue={item => item.label}
                            renderItem={(item, highlighted) =>
                                <div
                                    key={item.id}
                                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                >
                                    {item.label}
                                </div>
                            }
                            value={this.state.value}
                            onChange={e => this.setState({ value: e.target.value })}
                            onSelect={value => this.setState({ value })}
                        /> */}
                        <input
                            type="text"
                            name="movie"
                            value={this.state.movie}
                            onChange={this.handleChange}
                        />
                        <select name="year" onChange={this.handleChange}>
                            <option value="">N/A</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                            <option value="1989">1989</option>
                            <option value="1988">1988</option>
                            <option value="1987">1987</option>
                            <option value="1986">1986</option>
                            <option value="1985">1985</option>
                            <option value="1984">1984</option>
                            <option value="1983">1983</option>
                            <option value="1982">1982</option>
                            <option value="1981">1981</option>
                            <option value="1980">1980</option>
                            <option value="1979">1979</option>
                            <option value="1978">1978</option>
                            <option value="1977">1977</option>
                            <option value="1976">1976</option>
                            <option value="1975">1975</option>
                            <option value="1974">1974</option>
                            <option value="1973">1973</option>
                            <option value="1972">1972</option>
                            <option value="1971">1971</option>
                            <option value="1970">1970</option>
                            <option value="1969">1969</option>
                            <option value="1968">1968</option>
                            <option value="1967">1967</option>
                            <option value="1966">1966</option>
                            <option value="1965">1965</option>
                            <option value="1964">1964</option>
                            <option value="1963">1963</option>
                            <option value="1962">1962</option>
                            <option value="1961">1961</option>
                            <option value="1960">1960</option>
                            <option value="1959">1959</option>
                            <option value="1958">1958</option>
                            <option value="1957">1957</option>
                            <option value="1956">1956</option>
                            <option value="1955">1955</option>
                            <option value="1954">1954</option>
                            <option value="1953">1953</option>
                            <option value="1952">1952</option>
                            <option value="1951">1951</option>
                            <option value="1950">1950</option>
                            <option value="1949">1949</option>
                            <option value="1948">1948</option>
                            <option value="1947">1947</option>
                            <option value="1946">1946</option>
                            <option value="1945">1945</option>
                            <option value="1944">1944</option>
                            <option value="1943">1943</option>
                            <option value="1942">1942</option>
                            <option value="1941">1941</option>
                            <option value="1940">1940</option>
                            <option value="1939">1939</option>
                            <option value="1938">1938</option>
                            <option value="1937">1937</option>
                            <option value="1936">1936</option>
                            <option value="1935">1935</option>
                            <option value="1934">1934</option>
                            <option value="1933">1933</option>
                            <option value="1932">1932</option>
                            <option value="1931">1931</option>
                            <option value="1930">1930</option>
                            <option value="1929">1929</option>
                            <option value="1928">1928</option>
                            <option value="1927">1927</option>
                            <option value="1926">1926</option>
                            <option value="1925">1925</option>
                            <option value="1924">1924</option>
                            <option value="1923">1923</option>
                            <option value="1922">1922</option>
                            <option value="1921">1921</option>
                            <option value="1920">1920</option>
                            <option value="1919">1919</option>
                            <option value="1918">1918</option>
                            <option value="1917">1917</option>
                            <option value="1916">1916</option>
                            <option value="1915">1915</option>
                            <option value="1914">1914</option>
                            <option value="1913">1913</option>
                            <option value="1912">1912</option>
                            <option value="1911">1911</option>
                            <option value="1910">1910</option>
                            <option value="1909">1909</option>
                            <option value="1908">1908</option>
                            <option value="1907">1907</option>
                            <option value="1906">1906</option>
                            <option value="1905">1905</option>
                        </select>
                        {" "}
                        <button className="searchButton" onClick={this.handleSearch}><FontAwesomeIcon icon="search" /></button>
                    </form>
					
					{(this.state.search === null)
					? null
					:
					<div>
					<img height="100px" width="50px" src={this.state.search.data.Poster} alt="moviePoster"/>
					<h4>{this.state.search.data.Title}</h4>
					</div>
					}

                </div>
									{(this.state.random.similar.length > 0)
									?
									<div className="similarSection">
										{this.state.random.similar.map(item => (
											<span>											
											<h4><img height="15px" width="20px" onClick={() => this.handleUpVote(item.movieId)} src={require('../assets/Icons/arrow-alt-up.svg')} alt="arrowUp"/> {item.yes}{" | "}{item.movieId}{" | "} <img height="15px" width="20px" onClick={() => this.handleDownVote(item.movieId)} src={require('../assets/Icons/arrow-alt-down.svg')} alt="arrowDown"/> {item.no}</h4>
											</span>
										))}
									</div>
									: null
									}
							</div>
							: null
							}
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