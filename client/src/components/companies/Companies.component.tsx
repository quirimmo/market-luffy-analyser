import * as React from 'react';
import Company from 'models/Company';
import CompanyCard from '../company/CompanyCard.component';
import { Observable } from 'rxjs';
import { Form, FormGroup, Label, Input } from 'reactstrap';

interface ICompaniesProps {
	companies: Company[];
	fetchCompanies: () => Observable<any>;
}

interface ICompaniesState {
	sectors: string[];
}

class Companies extends React.Component<ICompaniesProps, ICompaniesState> {
	constructor(props: any) {
		super(props);
		this.state = {
			sectors: []
		};
	}

	public render() {
		return (
			<div>
				<Form>
					<FormGroup className="row">
						<Label className="col-xl-2 col-lg-3 col-md-4 col-sm-4" for="commpany-name">
							Company Name:
						</Label>
						<Input
							className="col-xl-4 col-lg-5 col-md-6 col-sm-7"
							type="text"
							name="commpany-name"
							id="commpany-name"
							placeholder="Insert the name of the company"
						/>
					</FormGroup>
					<FormGroup className="row">
						<Label className="col-xl-2 col-lg-3 col-md-4 col-sm-4">Sectors:</Label>
						<FormGroup check={true}>
							{this.state.sectors.map((sector: string, index: number) => (
								<Label key={index} className="mr-5" check={true}>
									<Input type="checkbox" />
									{sector}
								</Label>
							))}
						</FormGroup>
					</FormGroup>
				</Form>
				<hr />
				<div className="row text-center">
					{this.props.companies.length ? (
						this.props.companies.map((company: Company, index: number) => {
							return (
								<div className="col-lg-3 col-md-4 col-sm-6" key={index}>
									<CompanyCard company={company} />
								</div>
							);
						})
					) : (
						<div className="companies-message row text-center">Loading companies...</div>
					)}
				</div>
			</div>
		);
	}

	public componentDidMount() {
		const instance: Companies = this;
		this.props.fetchCompanies();
		setTimeout(retrieveAllSectors, 1000);

		function retrieveAllSectors() {
			const sectors = new Set(instance.props.companies.map((company: Company) => company.sector));
			instance.setState({ sectors: Array.from(sectors) });
		}
	}
}

export default Companies;
