import React from 'react'
// TODO - add proptypes

const Header = props => {
	let Greeting
	if (props.user === null) {
		Greeting = <p>Welcome, guest</p>
	} else if (props.user.firstName) {
		Greeting = (
			<p>
				Welcome back, {props.user.firstName}
			</p>
		)
	} else if (props.user.local.username) {
		Greeting = (
			<p>
				Welcome, {props.user.local.username}
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
