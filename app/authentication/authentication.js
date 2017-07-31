import Login from './log-in/log-in';
import Signup from './sign-up/sign-up';
import Notify from 'components/notify/notify';

let notify;

export default class Authentication extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayLogin: true,
			email: '',
			password: '',
			name: ''
		}

		this.notifyApi = this.notifyApi.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.toggleDisplay = this.toggleDisplay.bind(this);
	}

	toggleDisplay() {
		this.setState(state => ({displayLogin: !state.displayLogin}));
		//notify.success('The account has been created.');
	}

	notifyApi(api) {
		notify = api;
	}

	handleChange(key, value) {
		this.setState({[key]: value});
	}

	render() {
		let {email, name, password, toggleDisplay, displayLogin} = this.state;

		return(
			<div className="authenticate-box">
				{displayLogin ? <Login 
					email={email}
					password={password}
					handleChange={this.handleChange} /> : ''}
				{!displayLogin ? <Signup 
					email={email}
					name={name} /> : ''}

				<Notify notifyApi={this.notifyApi} />

				{displayLogin ? 
					<div className="sign-up-now">Don't have an account yet? 
						<span onClick={() => this.toggleDisplay()}> Signup Now</span>
					</div>
				: ''}
				{!displayLogin ? 
					<div className="sign-up-now">Got an account? 
						<span onClick={() => this.toggleDisplay()}> Login Now</span>
					</div>
				: ''}
			</div>
		)		
	}
}