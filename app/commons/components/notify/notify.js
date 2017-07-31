export default class Notify extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayNotify: false
		}

		this.showNotify = this.showNotify.bind(this);
		this.hideNotify = this.hideNotify.bind(this);
		this.success = this.success.bind(this);
		this.error = this.error.bind(this);
		this.info = this.info.bind(this);

	}

	componentWillMount() {
		this.props.notifyApi({
			success: this.success,
			error: this.error,
			info: this.info
		});
	}

	showNotify(msg, type) {
		this.setState({msg, type, displayNotify: true}, () => this.hideNotify(5000));
	}

	hideNotify(ms) {
		setTimeout(() => this.setState({displayNotify: false}), ms);
	}

	success(msg) {
		this.showNotify(msg, 'success');
	}

	error(msg) {
		this.showNotify(msg, 'error');
	}

	info(msg) {
		this.showNotify(msg, 'info');
	}

	render() {
		let {msg, type, displayNotify} = this.state;

		return (
			<div>
				{displayNotify ? 
					<div className={`notify ${type}`}>
						{msg}
					</div>
				: ''}
			</div>
		)
	}
}