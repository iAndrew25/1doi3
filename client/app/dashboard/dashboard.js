import {Link} from 'react-router-dom';
import {getUser, setUser} from 'utils/user';
import DashboardHeader from './dashboard-header/dashboard-header';
import UserSearch from './user-search/user-search';
import LHPMenu from './lhp-menu/lhp-menu';

export default function() {
	return(
		<div>
			<DashboardHeader />
			<LHPMenu />
			<UserSearch />
		</div>
	)
}