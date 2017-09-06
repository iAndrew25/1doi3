import People from './people/people';
import Messages from './messages/messages';

export default class LHPMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: ''
		};

		this.changeSelectedItem = this.changeSelectedItem.bind(this);
	}

	changeSelectedItem(selectedItem) {
		this.state.selectedItem === selectedItem ? this.setState({selectedItem: ''}) : this.setState({selectedItem});
	}

	render() {
		let {selectedItem} = this.state;

		return(
			<div>
				<ul className="lhp-menu">
					<li onClick={() => this.changeSelectedItem('messages')}>
						<div className="lhp-icon messages" />
						<div className="name">Messages</div>
					</li>
					<li onClick={() => this.changeSelectedItem('people')}>
						<div className="lhp-icon people" />
						<div className="name">People</div>
					</li>
					<li>
						<div className="lhp-icon settings" />
						<div className="name">Settings</div>
					</li>
				</ul>

				<People 
					selectedItem={selectedItem} />

				<Messages
					selectedItem={selectedItem} />
			</div>
		)
	}
}