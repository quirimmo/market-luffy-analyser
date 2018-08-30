import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './../../../assets/styles/main.scss';

export interface IAppGroupProps {
	fetchCompanies: () => void;
}

class App extends React.Component<IAppGroupProps, any> {
	constructor(props: IAppGroupProps) {
		super(props);
		this.onRetrieveAllData = this.onRetrieveAllData.bind(this);
	}

	public render() {
		return (
			<BrowserRouter basename="/">
				<Container className="main-app-wrapper">
					<button onClick={this.onRetrieveAllData}>RETRIEVE ALL DATA</button>
				</Container>
			</BrowserRouter>
		);
	}

	public onRetrieveAllData() {
		this.props.fetchCompanies();
		console.log('clicked!');
	}
}

export default App;
