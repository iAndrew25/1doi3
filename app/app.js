import test from 'utils/test';
import Authentication from './authentication/authentication';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="box">
				<Authentication />
			</div>
		)
	}
}