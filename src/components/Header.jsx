import React from 'react'
import '../App.css'
// TODO - add proptypes

const Header = props => {
	let Greeting
	if (props.user === null) {
		Greeting = <p>Welcome, to Cinephile Central</p>
	} else if (props.user.firstName) {
		Greeting = (
			<p>
				Welcome back to Cinephile Central, {props.user.firstName}
			</p>
		)
	} else if (props.user.local.username) {
		Greeting = (
			<p>
				Welcome to Cinephile Central, {props.user.local.username}
			</p>
		)
	}
	return (
		<div className="Header">
			{Greeting}
		</div>
	)
}

export default Header
