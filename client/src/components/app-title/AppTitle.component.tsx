import * as React from 'react';
import { Row, Col, Badge } from 'reactstrap';
import './style.scss';

class AppTitle extends React.Component<object> {
	constructor(props: object) {
		super(props);
	}

	public render() {
		return (
			<header>
				<Row>
					<Col>
						<h2 className="main-app-title">
							<Badge color="secondary">Market Luffy Analyser</Badge>
						</h2>
					</Col>
				</Row>
			</header>
		);
	}
}

export default AppTitle;
