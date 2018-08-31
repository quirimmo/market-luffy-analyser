import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './../../../assets/styles/main.scss';
import Company from './../../models/Company';

export interface IAppGroupProps {
	fetchCompanies: () => void;
	companies: Company[];
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
					<br />
					{this.props.companies.map((company: Company, index: number) => (
						<div key={index}>{company.symbol}</div>
					))}
				</Container>
			</BrowserRouter>
		);
	}

	public onRetrieveAllData() {
		this.props.fetchCompanies();
	}
}

export default App;
