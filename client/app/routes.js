import {Switch, Route, Redirect} from 'react-router-dom';
import {removeToken, isTokenSet} from 'utils/auth';
import Authentication from './authentication/authentication';
import Dashboard from './dashboard/dashboard';

export default function() {

	function isLogged() {
		if(isTokenSet()) {
			return <Redirect to="/dashboard" />
		} else {
			return <Authentication />;
		}
	}

	function privateRoute(component) {
		if(isTokenSet()) {
			return component;
		} else {
			return <Redirect to="/" />
		}
	}

	function logout() {
		removeToken();
		return <Redirect to="/" />
	}

	return(
		<Switch>
			<Route exact path='/' render={() => isLogged()}/>
			<Route exact path='/logout' render={() => logout()}/>
			<Route exact path='/dashboard' render={() => privateRoute(<Dashboard />)}/>
			<Route component={() => (<div>404 - GTFO</div>)}/>
		</Switch>
	)
}