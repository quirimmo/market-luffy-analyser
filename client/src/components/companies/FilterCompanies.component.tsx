import * as React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

interface IFilterCompaniesProps {
	sectors: string[];
	filterCompanyName: (companyName: string) => void;
}

class FilterCompanies extends React.Component<IFilterCompaniesProps, any> {
	public constructor(props: IFilterCompaniesProps) {
		super(props);
		this.onCompanyNameChange = this.onCompanyNameChange.bind(this);
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
					<Label className="col-xl-2 col-lg-3 col-md-4 col-sm-4">Sectors:</Label>
					<FormGroup check={true}>
						{this.props.sectors.map((sector: string, index: number) => (
							<Label key={index} className="mr-5 company-form-checkbox-label" check={true}>
								<Input type="checkbox" defaultChecked={true} />
								{sector}
							</Label>
						))}
					</FormGroup>
				</FormGroup>
			</Form>
		);
	}

	public onCompanyNameChange(event: any): void {
		this.props.filterCompanyName(event.target.value.trim().toUpperCase());
	}
}

export default FilterCompanies;
