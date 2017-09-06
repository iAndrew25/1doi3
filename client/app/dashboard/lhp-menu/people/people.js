import classnames from 'classnames';

export default function(props) {
	return(
		<div className={classnames('people-sidebar', {'show-people': props.selectedItem === 'people'})}>
			<div className="search">
				<span className="magnifying-glass" />
				<input type="text" placeholder="Search for people" />
			</div>
			<ul className="users">
				<li>
					<div className="profile-picture"><div className="avatar" /></div>
					<div className="profile-details">
						<div className="display-name">John Doe</div>
						<div className="profile-description"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam quia quaerat tempora, molestias molestiae sequi minus deleniti repellendus, voluptatum cum hic! Dolores consectetur quam, delectus nam, vitae iure! Ab, architecto. </div>
					</div>
				</li>
			</ul>
		</div>
	)
}