import test from 'utils/test';
import Authentication from './authentication/authentication';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 'It\'s working, OMG!!!!'
		}
	}

	render() {
		return(
			<div className="box">
				<Authentication />
			</div>
		)
	}
}