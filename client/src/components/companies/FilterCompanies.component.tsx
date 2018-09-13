import * as React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

interface IFilterCompaniesProps {
	sectors: string[];
	toggleCompanyVisibility: (companyName: string, companySectors: string[]) => void;
}

interface IFilterCompaniesState {
	selectedName: string;
	selectedSectors: Set<string>;
}

class FilterCompanies extends React.Component<IFilterCompaniesProps, IFilterCompaniesState> {
	public constructor(props: IFilterCompaniesProps) {
		super(props);
		this.onCompanyNameChange = this.onCompanyNameChange.bind(this);
		this.onCompanySectorChange = this.onCompanySectorChange.bind(this);

		this.state = { selectedSectors: new Set(), selectedName: '' };
	}

	public render() {
		return (
			<Form>
				<FormGroup className="row">
					<Label className="col-xl-2 col-lg-3 col-md-4 col-sm-4" for="commpany-name">
						Company Name:
					</Label>
					<Input
						className="col-xl-10 col-lg-9 col-md-8 col-sm-8"
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
		const selectedName: string = event.target.value.trim().toUpperCase();
		this.setState(
			(prevState: IFilterCompaniesState) => ({
				selectedName,
				selectedSectors: prevState.selectedSectors
			}),
			this.dispatchToggleCompanyVisibility
		);
	}

	public onCompanySectorChange(event: any): void {
		const currentSector = event.target.id.toUpperCase();
		event.target.checked ? this.state.selectedSectors.add(currentSector) : this.state.selectedSectors.delete(currentSector);
		this.setState(
			(prevState: IFilterCompaniesState) => ({
				selectedName: prevState.selectedName,
				selectedSectors: prevState.selectedSectors
			}),
			this.dispatchToggleCompanyVisibility
		);
	}

	public dispatchToggleCompanyVisibility(): void {
		this.props.toggleCompanyVisibility(this.state.selectedName, Array.from(this.state.selectedSectors));
	}

	public componentDidUpdate(prevProps: IFilterCompaniesProps) {
		if (this.props.sectors.length > prevProps.sectors.length) {
			this.props.sectors.forEach((sector: string) => {
				this.state.selectedSectors.add(sector.toUpperCase());
			});
		}
	}
}

export default FilterCompanies;
