import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import ReactAutocomplete from 'react-autocomplete';
import '../App.css';

class Voting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            search: '',
            year: '',
            value: '',
            options: [],
            stage: 'select',
            type: '',
            style: '',
            viewers: 0,
            number: 0,
            votes: 0,
            winner: '',
            name: '',
            code: '',
            viewer: 1,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleNext2 = this.handleNext2.bind(this);
        this.handleNext3 = this.handleNext3.bind(this);
        this.handleNext4 = this.handleNext4.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleMultipleAdd = this.handleMultipleAdd.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.handleRecast = this.handleRecast.bind(this);
        this.handleWinner = this.handleWinner.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentDidMount() {
        axios.get("/autocomplete/").then((res) => {
            this.setState({
                suggestions: res.data,
            });
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    };

    handleCreate(event) {

    }

    handleNext(event) {
        event.preventDefault();
        document.getElementById("form").reset();
        if (this.state.type === "multiple") {
            this.setState({
                stage: "mselect1"
            });
        }
        else {
            this.setState({
                stage: "select2"
            });
        }

    };

    handleNext2(event) {
        event.preventDefault();
        document.getElementById("form").reset();
        if (this.state.style === "random") {
            this.setState({
                stage: "select4",
            });
        }
        else {
            this.setState({
                stage: "select3"
            });
        }
    };

    handleNext3(event) {
        event.preventDefault();
        document.getElementById("form").reset();
        this.setState({
            stage: "select4"
        });
    };

    handleNext4(event) {
        event.preventDefault();
        document.getElementById("form").reset();
        this.setState({
            stage: "movie-select"
        });
    };

    handleSearch(event) {
        event.preventDefault();
        this.setState({
            value: '',
        });
        let queryUrl = `https://www.omdbapi.com/?t=${this.state.value}&y=${this.state.year}&plot=short&apikey=trilogy`;
        console.log("HTTPS is now active!");

        axios.get(queryUrl).then((res) => {
            console.log(res);
            this.setState({
                movie: '',
                year: '',
                search: res,
            });
        });
    };

    handleAdd(event) {
        let movie =
        {
            title: this.state.search.data.Title,
            poster: this.state.search.data.Poster,
            votes: 0
        }
        this.setState({
            options: [...this.state.options, movie],
            search: '',
        });
        console.log(this.state.number);
        console.log(this.state.options.length);

        if (this.state.number == this.state.options.length) {
            if (this.state.style === "random") {
                let array = [...this.state.options];
                let random = array[Math.floor(Math.random() * array.length)];
                this.setState({
                    stage: "result",
                    winner: random,
                });
            }
            else {
                this.setState({
                    stage: "vote"
                });
            }
        }
    };

    handleMultipleAdd(event) {
        let movie = 
        {
            title: this.state.search.data.Title,
            poster: this.state.search.data.Poster,
            votes: 0,
        }
    }

    handleVote(event) {
        console.log("value");
        console.log(event.target.value);
        let movie = event.target.value;
        let result = this.state.options.find(function (element) {
            return element.title === movie
        });
        console.log(result);
        let array = [...this.state.options];
        let index = array.indexOf(result);
        array.splice(index, 1);
        result.votes++;
        array.push(result);
        this.setState({
            options: array,
            votes: this.state.votes + 1,
            viewer: this.state.viewer +1
        });
        if (this.state.viewers == this.state.votes) {
            if (this.state.style === "majority") {
                this.setState({
                    stage: "result",
                })
                let array = [...this.state.options]
                let winner = Math.max.apply(Math, array.map(function (o) { return o.votes }
                ));
                let results = array.filter(item => item.votes == winner);
                console.log("results");
                console.log(results);
                this.setState({
                    winner: results
                });
                if (results.length > 1) {
                    this.setState({
                        stage: "tie",
                        options: results,
                    });
                }
            }
            else if (this.state.style === "lottery") {
                let options = [...this.state.options];
                const result = options.reduce((res, el) => res.concat(Array(el.votes).fill(el.title)), []);
                console.log("lottery array");
                console.log(result);
                let random = result[Math.floor(Math.random() * result.length)];
                let found = options.find(options => options.title === random);
                this.setState({
                    stage: "result",
                    winner: found,
                });
            }

        }
    }

    handleRecast(event) {
        this.setState({
            stage: "vote",
            votes: 0,
        })
    }

    handleWinner(event) {
        this.setState({
            stage: "winner",
        })
    }

    render() {
        if (this.state.stage === 'select') {
            return (
                <div id="movie-display">
                    <h1>Have a group of friends and can't decide on a movie?</h1>
                    <h2>Here let me help.</h2>
                    <br />
                    <h3>Do you wish to vote on one device or separate?</h3>
                    <form id="form">
                        <select name="type" onChange={this.handleChange}>
                            <option value="" selected>Select One</option>
                            <option value="one">Just this one</option>
                            <option value="multiple">Multiple</option>
                        </select>
                        {" "}
                        <button onClick={this.handleNext}>Next</button>
                    </form>


                </div>
            )
        }
        else if (this.state.stage === "select2") {
            return (
                <div id="movie-display">
                    <h3>How would you like decide the winner?</h3>
                    <form id="form">
                        <select name="style" onChange={this.handleChange}>
                            <option value="" selected>Select One</option>
                            <option value="majority">Majority Wins</option>
                            <option value="lottery">Lottery Vote</option>
                            <option value="random">Random</option>
                        </select>
                        {" "}
                        <button onClick={this.handleNext2}>Next</button>
                    </form>
                </div>
            )
        }
        else if (this.state.stage === "select3") {
            return (
                <div id="movie-display">
                    <h3>Great and how many people will be voting?</h3>
                    <form id="form">
                        <select name="viewers" onChange={this.handleChange}>
                            <option value="" selected>Select One</option>
                            <option value="2">3</option>
                            <option value="3">4</option>
                            <option value="4">5</option>
                            <option value="5">6</option>
                            <option value="6">7</option>
                            <option value="7">8</option>
                            <option value="8">9</option>
                            <option value="9">10</option>
                        </select>
                        {" "}
                        <button onClick={this.handleNext3}>Next</button>
                    </form>
                </div>
            )
        }
        else if (this.state.stage === "select4") {
            return (
                <div id="movie-display">
                    <h3>How many movies are you in the running?</h3>
                    <form id="form">
                        <select name="number" onChange={this.handleChange}>
                            <option value="" selected>Select One</option>
                            <option value="2">3</option>
                            <option value="3">4</option>
                            <option value="4">5</option>
                            <option value="5">6</option>
                        </select>
                        {" "}
                        <button onClick={this.handleNext4}>Next</button>
                    </form>
                </div>
            )

        }
        else if (this.state.stage === "movie-select" && this.state.search) {
            return (
                <div>
                    <h3 id="movie-display">Search and select the movies you want in the running.</h3>
                    <br />
                    <form>
                        <ReactAutocomplete
                            items={
                                this.state.suggestions.map(item => (
                                    { id: item.title, label: item.title }
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
                        />

                        <select name="year" onChange={this.handleChange}>
                            <option value="" selected="selected">N/A</option>
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
                    <br />
                    <div id="movie-display">
                        <br />
                        <button onClick={this.handleAdd}>Put in the running.</button>
                        <br />
                        <br />
                        <img className="poster" src={this.state.search.data.Poster} alt="poster" />
                        <h1>{this.state.search.data.Title}</h1>
                        <p>Date of Release: {this.state.search.data.Released}</p>
                        <p>Rated: {this.state.search.data.Rated}</p>
                        <p>Runtime: {this.state.search.data.Runtime}</p>
                        <p>Directed by: {this.state.search.data.Director}</p>
                        <p>Actors: {this.state.search.data.Actors}</p>
                        <p>Plot: {this.state.search.data.Plot}</p>
                        <p>Awards: {this.state.search.data.Awards}</p>
                        <p>MetaScore: {this.state.search.data.Metascore}</p>
                        <p>Imdb Rating: {this.state.search.data.imdbRating}</p>

                    </div>
                </div>
            )
        }
        else if (this.state.stage === "movie-select") {
            return (
                <div>
                    <h3 id="movie-display">Search and select the movies you want in the running.</h3>
                    <br />
                    <form>
                        <ReactAutocomplete
                            items={
                                this.state.suggestions.map(item => (
                                    { id: item.title, label: item.title }
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
                        />

                        <select name="year" onChange={this.handleChange}>
                            <option value="" selected="selected">N/A</option>
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
                </div>
            )

        }
        else if (this.state.stage === "vote") {
            return (
                <div id="movie-display" className="float-contain">
                    <h3>Viewer {this.state.viewer} enter your vote.</h3>
                    {this.state.options.map(item => (
                        <div key={item.title} className="float">
                            <img src={item.poster} alt={item.title} className="optionPoster"/>
                            <h1>{item.title}</h1>
                            <br />
                            <button value={item.title} onClick={this.handleVote}>Vote</button>
                        </div>
                    ))}
                </div>
            )
        }
        else if (this.state.stage === "result") {
            return (
                <div id="movie-display">
                    <h1>The Winner is!</h1>
                    <button onClick={this.handleWinner}>Show Winner</button>
                </div>
            )
        }
        else if (this.state.stage === "tie") {
            return (
                <div id="movie-display">
                    <h1>There was a tie...</h1>
                    <button onClick={this.handleRecast}>Recast Votes!</button>
                </div>
            )
        }
        else if (this.state.stage === "winner" && this.state.style === "random") {
            return (
                <div id="movie-display">
                    <br />
                    <img className="poster" src={this.state.winner.poster} alt="poster" />
                    <h1>{this.state.winner.title}</h1>
                </div>
            )
        }
        else if (this.state.stage === "winner" && this.state.style === "majority") {
            return (
                <div id="movie-display">
                    <br />
                    <img className="poster" src={this.state.winner[0].poster} alt="poster" />
                    <h1>{this.state.winner[0].title}</h1>
                </div>
            )
        }
        else if (this.state.stage === "winner" && this.state.style === "lottery") {
            return (
                <div id="movie-display">
                    <br />
                    <img className="poster" src={this.state.winner.poster} alt="poster" />
                    <h1>{this.state.winner.title}</h1>
                </div>
            )
        }
        else if (this.state.stage === "mselect1") {
            return (
                <div id="movie-display">
                    <h3>Open Voting!</h3>
                    <br />
                    <form>
                        Give it a name: <br />
                        <input type="text" name="name" onChange={this.handleChange} value={this.state.name}/>
                        Give it a code: <br />
                        <input type="text" name="code" onChange={this.handleChange} value={this.state.code}/>
                        <br />
                        <button onClick={this.handleCreate}>Create</button>
                    </form>
                </div>
            )
        }
        else if (this.state.stage === "mselect2" && this.state.search) {
            return (
                <div>
                    <h3 id="movie-display">Search and select the movies you want in the running.</h3>
                    <br />
                    <form>
                        <ReactAutocomplete
                            items={
                                this.state.suggestions.map(item => (
                                    { id: item.title, label: item.title }
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
                        />

                        <select name="year" onChange={this.handleChange}>
                            <option value="" selected="selected">N/A</option>
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
                    <br />
                    <div id="movie-display">
                        <br />
                        <button onClick={this.handleMultipleAdd}>Put in the running.</button>
                        <br />
                        <br />
                        <img className="poster" src={this.state.search.data.Poster} alt="poster" />
                        <h1>{this.state.search.data.Title}</h1>
                        <p>Date of Release: {this.state.search.data.Released}</p>
                        <p>Rated: {this.state.search.data.Rated}</p>
                        <p>Runtime: {this.state.search.data.Runtime}</p>
                        <p>Directed by: {this.state.search.data.Director}</p>
                        <p>Actors: {this.state.search.data.Actors}</p>
                        <p>Plot: {this.state.search.data.Plot}</p>
                        <p>Awards: {this.state.search.data.Awards}</p>
                        <p>MetaScore: {this.state.search.data.Metascore}</p>
                        <p>Imdb Rating: {this.state.search.data.imdbRating}</p>

                    </div>
                </div>
            )
        }
        else if (this.state.stage === "mselect2") {
            return (
                <div>
                    <h3 id="movie-display">Search and select the movies you want in the running.</h3>
                    <br />
                    <form>
                        <ReactAutocomplete
                            items={
                                this.state.suggestions.map(item => (
                                    { id: item.title, label: item.title }
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
                        />

                        <select name="year" onChange={this.handleChange}>
                            <option value="" selected="selected">N/A</option>
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
                </div>
            )
        }
    }

}

export default Voting;