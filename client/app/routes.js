import {Switch, Route, Redirect} from 'react-router-dom';
import {removeToken, isTokenSet} from 'utils/auth';
import Authentication from './authentication/authentication';

export default function() {

	function isLogged() {
		if(isTokenSet()) {
			return <Redirect to="/my-profile" />
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
			<Route exact path='/my-profile' render={() => privateRoute(<div>my profile</div>)}/>
			<Route component={() => (<div>404 - GTFO</div>)}/>
		</Switch>
	)
}