import {Link} from 'react-router-dom';

export default function() {
	return(
		<div className="dashboard-header">
			<div className="logo">1DOI3</div>
			<div className="right-menu">
				<Link to="/logout">
					<div className="logout" />
				</Link>
			</div>
		</div>
	)
}