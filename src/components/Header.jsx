import React from 'react'
import '../App.css'
// TODO - add proptypes

const Header = props => {
	let Greeting
	if (props.user === null) {
		Greeting = <p>Welcome, to Movie Night</p>
	} else if (props.user.firstName) {
		Greeting = (
			<p>
				Welcome back to Movie Night, {props.user.firstName}
			</p>
		)
	} else if (props.user.local.username) {
		Greeting = (
			<p>
				Welcome to Movie Night, {props.user.local.username}
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
