import {Link} from 'react-router-dom';
import {getUser, setUser} from 'utils/user';

export default function() {
	return(
		<div className="dashboard">
			<header>
				<div className="logo">1DOI3</div>
				<Link to="/logout">
					<div className="my-profile">
						<div className="profile-name">John Doe</div>
						<div className="profile-picture"><div className="avatar" /></div>
					</div>
				</Link>
			</header>
			<aside>
				<div className="search">
					<span className="magnifying-glass" />
					<input type="text" placeholder="Search for people" />
				</div>
				<ul className="users">
					<li>
						<div className="profile-picture"><div className="avatar"/></div>
						<div className="profile-details">
							<div className="display-name">John Doe</div>
							<div className="profile-description"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam quia quaerat tempora, molestias molestiae sequi minus deleniti repellendus, voluptatum cum hic! Dolores consectetur quam, delectus nam, vitae iure! Ab, architecto. </div>
						</div>
					</li>
				</ul>
			</aside>
		</div>
	)
}