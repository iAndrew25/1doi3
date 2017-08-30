export default class Notify extends React.Component {
	constructor(props) {
		super(props);
		this.id = 0;
		this.state = {
			notifications: []
		}

		this.addNotify = this.addNotify.bind(this);
		this.hideNotify = this.hideNotify.bind(this);

	}

	componentWillMount() {
		this.props.notifyApi({
			addNotify: this.addNotify
		});
	}

	addNotify(msg) {
		let obj = {id: this.id++, msg};
		this.setState({notifications: [...this.state.notifications, obj]}, () => this.hideNotify(obj.id, 3000));
	}

	hideNotify(id, ms) {
		setTimeout(() => this.setState({notifications: this.state.notifications.filter(i => id !== i.id)}), ms);
	}

	render() {
		return (
			<div className="notifications">
				{this.state.notifications.map(({id, msg}) => <div onClick={() => this.hideNotify(id, 0)} key={id} className="notification">{msg}</div>)}
			</div>
		)
	}
}