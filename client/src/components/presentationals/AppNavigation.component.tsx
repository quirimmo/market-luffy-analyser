import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

class AppNavigation extends React.Component<object> {
	constructor(props: object) {
		super(props);
	}

	public render() {
		return (
			<nav>
				<Row>
					<Col sm="2">
						<NavLink to="/home">Home Page</NavLink>
						<NavLink to="/companies">Companies Page</NavLink>
					</Col>
				</Row>
			</nav>
		);
	}
}

export default AppNavigation;
