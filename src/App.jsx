import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import './App.css';
import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/SignupForm';
import Header from './components/Header';
import Home from './components/Home';
import Search from './components/Search';
import UserPage from './components/UserPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<nav>
				<ul>
					<li>
						<Link to="/">
							<FontAwesomeIcon icon="home" />
						</Link>
					</li>
					<li>
						<Link to="/userpage">
							<FontAwesomeIcon icon="user-circle" />
						</Link>
					</li>
					<li>
						<Link to="#" onClick={props._logout}>
						<FontAwesomeIcon icon="sign-out-alt" />
						</Link>
					</li>
					
				</ul>
			</nav>
		)
	} else {
		return (
			<nav >
				<ul >
					<li >
						<Link to="/">
						<FontAwesomeIcon icon="home" />
						</Link>
					</li>
					<li >
						<Link to="/login">
							<FontAwesomeIcon icon="user" />
						</Link>
					</li>
					<li >
						<Link to="/signup">
							<FontAwesomeIcon icon="user-plus" />
						</Link>
					</li>
					
				</ul>
			</nav>
		)
	}
}

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loggedIn: false,
			user: null,
			test: this.props,
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}


	render() {
		return (
			<div className="App">
				{/* <Header user={this.state.user} /> */}
				{/* LINKS to our different 'pages' */}
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
				{/*  ROUTES */}
				{/* <Route exact path="/" component={Home} /> */}
				<Route exact path="/" render={() => <Home user={this.state.user} />} />
				{/* <Route exact path="/search" render={() => <Search user={this.state.user} />} /> */}
				<Route exact path="/search" render={() => <Search user={this.state.user} />}  />
				<Route
					exact
					path="/login"
					render={() =>
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>}
				/>
				<Route exact path="/signup" component={SignupForm} />
				{/* <LoginForm _login={this._login} /> */}	
				<Route exact path="/userpage"render={() => <UserPage user={this.state.user} />} />
				<Search user={this.state.user} />
			</div>
		)
	}
}

export default App;
