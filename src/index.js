import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignOutAlt, faUserPlus, faSearch, faUserCircle, faVideo, faTable, faBalanceScale} from '@fortawesome/free-solid-svg-icons';


library.add(faHome, faUser, faSignOutAlt, faUserPlus, faSearch, faUserCircle, faVideo, faTable, faBalanceScale);

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
)
