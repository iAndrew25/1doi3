import classnames from 'classnames';

export default function(props) {
	return(
		<div className={classnames('messages-sidebar', {'show-messages': props.selectedItem === 'messages'})}>
			<ul className="users">
				<li>
					dorinel
				</li>
								<li>
					dorinel
				</li>
								<li>
					dorinel
				</li>
								<li>
					dorinel
				</li>
								<li>
					dorinel
				</li>
			</ul>
		</div>
	)
}