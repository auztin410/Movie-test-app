import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import '../App.css';

class Vote extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searched: false,
            ready: false,
            viewers: '',
            savedViewers: '',
            voting: false,
            search: '',
            year: '',
            movie: '',
            choice1: '',
            choice2: '',
            choice3: '',
            choice4: '',
            voteChoice1: 0,
            voteChoice2: 0,
            voteChoice3: 0,
            voteChoice4: 0,
            votingComplete: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.handleCastVote1 = this.handleCastVote1.bind(this);
        this.handleCastVote2 = this.handleCastVote2.bind(this);
        this.handleCastVote3 = this.handleCastVote3.bind(this);
        this.handleCastVote4 = this.handleCastVote4.bind(this);
        this.handleRecastVote = this.handleRecastVote.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSearch(event) {
        event.preventDefault();
        this.setState({
            search: '',
            searched: false,
        });
        let queryUrl = `https://www.omdbapi.com/?t=${this.state.movie}&y=${this.state.year}&plot=short&apikey=trilogy`;
        console.log("HTTPS is now active!");    

        axios.get(queryUrl).then((res) => {
            console.log(res);
            this.setState({
                movie: '',
                year: '',
                search: res,
                searched: true
            });
        });
    };

    handleAdd(event) {
        if(!this.state.choice1) {
            this.setState({
                choice1: this.state.search,
                search: '',
                searched: false
            });
        }
        else if(!this.state.choice2) {
            this.setState({
                choice2: this.state.search,
                search: '',
                searched: false
            });
        }
        else if(!this.state.choice3) {
            this.setState({
                choice3: this.state.search,
                search: '',
                searched: false
            });
        }
        else{
            this.setState({
                choice4: this.state.search,
                search: '',
                searched: false,
                ready: true
            });
        }
    };

    handleVote(event) {
        event.preventDefault();
        this.setState({
            voting: true,
            ready: false,
            savedViewers: this.state.viewers,
        });
    };

    handleCastVote1(event) {
        this.setState({
            viewers: this.state.viewers -1,
            voteChoice1: this.state.voteChoice1 +1
        });
        if(this.state.viewers === 1) {
            this.setState({
                votingComplete: true
            });
        }
    };

    handleCastVote2(event) {
        this.setState({
            viewers: this.state.viewers -1,
            voteChoice2: this.state.voteChoice2 +1
        });
        if(this.state.viewers === 1) {
            this.setState({
                votingComplete: true
            });
        }
    };

    handleCastVote3(event) {
        this.setState({
            viewers: this.state.viewers -1,
            voteChoice3: this.state.voteChoice3 +1
        });
        if(this.state.viewers === 1) {
            this.setState({
                votingComplete: true
            });
        }
    };

    handleCastVote4(event) {
        this.setState({
            viewers: this.state.viewers -1,
            voteChoice4: this.state.voteChoice4 +1
        });
        if(this.state.viewers === 1) {
            this.setState({
                votingComplete: true
            });
        }
    };

    handleRecastVote(event) {
        this.setState({
            votingComplete: false,
            viewers: this.state.savedViewers,
            voteChoice1: 0,
            voteChoice2: 0,
            voteChoice3: 0,
            voteChoice4: 0,
        });
    };

    render() {
        let Winner
        if( this.state.voteChoice1 > this.state.voteChoice2 && this.state.voteChoice1 > this.state.voteChoice3 && this.state.voteChoice1 > this.state.voteChoice4) {
            Winner = (
                <div>
                    <img src={this.state.choice1.data.Poster} alt={this.state.choice1.data.Title} />
                    <h1>{this.state.choice1.data.Title}</h1>
                </div>
            )
        }
        else if( this.state.voteChoice2 > this.state.voteChoice1 && this.state.voteChoice2 > this.state.voteChoice3 && this.state.voteChoice2 > this.state.voteChoice4){
            Winner = (
                <div>
                    <img src={this.state.choice2.data.Poster} alt={this.state.choice2.data.Title} />
                    <h1>{this.state.choice2.data.Title}</h1>
                </div>
            )
        }
        else if( this.state.voteChoice3 > this.state.voteChoice1 && this.state.voteChoice3 > this.state.voteChoice2 && this.state.voteChoice3 > this.state.voteChoice4){
            Winner = (
                <div>
                    <img src={this.state.choice3.data.Poster} alt={this.state.choice3.data.Title} />
                    <h1>{this.state.choice3.data.Title}</h1>
                </div>
            )
        }
        else if( this.state.voteChoice4 > this.state.voteChoice1 && this.state.voteChoice4 > this.state.voteChoice2 && this.state.voteChoice4 > this.state.voteChoice3){
            Winner = (
                <div>
                    <img src={this.state.choice4.data.Poster} alt={this.state.choice4.data.Title} />
                    <h1>{this.state.choice4.data.Title}</h1>
                </div>
            )
        }
        else{
            Winner = (
                <div>
                    <h4>There was a tie!</h4>
                    <button onClick={this.handleRecastVote}>Recast Vote!</button>
                </div>
            )
        }
        if(this.state.votingComplete === true) {
            return(
                <div id="movie-display">
                    <h1>The Winner Is!</h1>
                        {Winner}
                </div>
            )
        }
        else if (this.state.ready === true){
            return(
                <div className="search">
                    <form>
                        <input
                        type="text"
                        name="viewers"
                        value={this.state.viewers}
                        onChange={this.handleChange}
                        />
                        <select name="year" onChange={this.handleChange}>
                            <option value="">N/A</option>
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
                        <button
                        onClick={this.handleVote}
                        disabled={!(this.state.viewers)}
                        >Start Voting!</button>
                    </form>
                </div>
            )
        }
        else if (this.state.voting === true) {
            return(
                <div className="grid">
                    <div className="option1">
                        <img className="optionPoster" src={this.state.choice1.data.Poster} alt={this.state.choice1.data.Title}/>
                        <h4>{this.state.choice1.data.Title}</h4>
                        <button className="castVote" onClick={this.handleCastVote1}>Cast Vote</button>
                    </div>

                    <div className="option2">
                    <img className="optionPoster" src={this.state.choice2.data.Poster} alt={this.state.choice2.data.Title}/>
                        <h4>{this.state.choice2.data.Title}</h4>
                        <button className="castVote" onClick={this.handleCastVote2}>Cast Vote</button>
                    </div>

                    <div className="option3">
                    <img className="optionPoster" src={this.state.choice3.data.Poster} alt={this.state.choice3.data.Title}/>
                        <h4>{this.state.choice3.data.Title}</h4>
                        <button className="castVote" onClick={this.handleCastVote3}>Cast Vote</button>
                    </div>

                    <div className="option4">
                    <img className="optionPoster" src={this.state.choice4.data.Poster} alt={this.state.choice4.data.Title}/>
                        <h4>{this.state.choice4.data.Title}</h4>
                        <button className="castVote" onClick={this.handleCastVote4}>Cast Vote</button>
                    </div>
                </div>
            )
        }
        else if (this.state.searched === false) {
            return (
                <div className="search">
                    <form>
                        <input
                            type="text"
                            name="movie"
                            value={this.state.movie}
                            onChange={this.handleChange}
                        />
                        <select name="year" onChange={this.handleChange}>
                            <option value="">N/A</option>
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
        else if (this.state.searched === true && this.state.search.data.Response === "False") {
            return(
                <div className="search">
                <form>
                        <input
                            type="text"
                            name="movie"
                            value={this.state.movie}
                            onChange={this.handleChange}
                        />
                        <select name="year" onChange={this.handleChange}>
                            <option value="">N/A</option>
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
                    <div>
                        <h3>{this.state.search.data.Error}</h3>
                    </div>
            </div>
            )            
        }
        else if (this.state.searched === true) {
            return (
                <div className="search">
                    <form>
                        <input
                            type="text"
                            name="movie"
                            value={this.state.movie}
                            onChange={this.handleChange}
                        />
                        <select name="year" onChange={this.handleChange}>
                            <option value="">N/A</option>
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
                    <img className="poster" src={this.state.search.data.Poster} />
                        <h1>Title: {this.state.search.data.Title}</h1>
                        <p>Date of Release: {this.state.search.data.Released}</p>
                        <p>Rated: {this.state.search.data.Rated}</p>
                        <p>Runtime: {this.state.search.data.Runtime}</p>
                        <p>MetaScore: {this.state.search.data.Metascore}</p>
                        <p>Imdb Rating: {this.state.search.data.imdbRating}</p>
                        <p>Plot: {this.state.search.data.Plot}</p>
                        <br />
                        <button
                        onClick={this.handleAdd}
                        disabled={this.state.choice1 && this.state.choice2 && this.state.choice3 && this.state.choice4}
                        >Place in the running</button>
                    </div>
                </div>
            )
        }

    }
}

export default Vote;