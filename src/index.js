import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUser, faSignOutAlt, faUserPlus, faSearch, faUserCircle, faVideo, faTable, faBalanceScale} from '@fortawesome/free-solid-svg-icons';


library.add(faHome, faUser, faSignOutAlt, faUserPlus, faSearch, faUserCircle, faVideo, faTable, faBalanceScale);

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
)
