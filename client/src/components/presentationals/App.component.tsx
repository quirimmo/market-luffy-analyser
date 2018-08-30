import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './../../../assets/styles/main.scss';

class App extends React.Component<{}, any> {
	constructor (props: {}) {
		super(props);
	}

	public render () {
		return (
			<BrowserRouter basename="/">
				<Container className="main-app-wrapper">
					<div>Dai cazzo</div>
				</Container>
			</BrowserRouter>
		);
	}
}

export default App;
