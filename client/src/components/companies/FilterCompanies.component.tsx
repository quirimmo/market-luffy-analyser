import * as React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Company from './../../models/Company';

interface IFilterCompaniesProps {
	sectors: string[];
	companySectors: string[];
	filterCompanySectors: (companySectors: string[]) => void;
	toggleCompanyVisibility: (companyName: string) => void;
}

class FilterCompanies extends React.Component<IFilterCompaniesProps, any> {
	public constructor(props: IFilterCompaniesProps) {
		super(props);
		this.onCompanyNameChange = this.onCompanyNameChange.bind(this);
		this.onCompanySectorChange = this.onCompanySectorChange.bind(this);
		this.removeSector = this.removeSector.bind(this);
		this.addSector = this.addSector.bind(this);
	}

	public render() {
		return (
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
						onChange={this.onCompanyNameChange}
					/>
				</FormGroup>
				<FormGroup className="row">
					<Label className="col-xl-1 col-lg-3 col-md-4 col-sm-4">Sectors:</Label>
					<FormGroup className="col-xl-11 col-xs-12 col-12" check={true}>
						{this.props.sectors.map((sector: string, index: number) => (
							<Label for={sector} key={index} className="col-lg-2 col-md-3 col-6 company-form-checkbox-label" check={true}>
								<Input id={sector} name={sector} type="checkbox" onChange={this.onCompanySectorChange} defaultChecked={true} />
								{sector}
							</Label>
						))}
					</FormGroup>
				</FormGroup>
			</Form>
		);
	}

	public onCompanyNameChange(event: any): void {
		this.props.toggleCompanyVisibility(event.target.value.trim().toUpperCase());
	}

	public componentDidUpdate(prevProps: IFilterCompaniesProps) {
		if (this.props.sectors.length > prevProps.sectors.length) {
			console.log('Fetching sectors to company sectors filter');
			this.props.filterCompanySectors(this.props.sectors.map((sector: string) => sector.toUpperCase()));
		}
	}

	public onCompanySectorChange(event: any): void {
		const currentSector = event.target.id.toUpperCase();
		event.target.checked ? this.addSector(currentSector) : this.removeSector(currentSector);
		this.props.filterCompanySectors(this.props.companySectors);
	}

	public removeSector(sector: string) {
		const index: number = this.props.companySectors.indexOf(sector);
		if (index > -1) {
			this.props.companySectors.splice(index, 1);
		}
	}

	public addSector(sector: string) {
		const index: number = this.props.companySectors.indexOf(sector);
		if (index === -1) {
			this.props.companySectors.push(sector);
		}
	}
}

export default FilterCompanies;
