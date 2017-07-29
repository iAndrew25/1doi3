import test from 'utils/test';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 'It\'s working, OMG!!!!'
		}
	}

	render() {
		test();
		return(
			<div className="box">
				<p>{this.state.value}</p>
			</div>
		)
	}
}