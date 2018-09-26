import * as React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

interface IFilterCryptosProps {
	toggleCryptoVisibility: (cryptoName: string) => void;
}

interface IFilterCryptosState {
	selectedName: string;
}

class FilterCryptos extends React.Component<IFilterCryptosProps, IFilterCryptosState> {
	public constructor(props: IFilterCryptosProps) {
		super(props);
		this.onCryptoNameChange = this.onCryptoNameChange.bind(this);

		this.state = { selectedName: '' };
	}

	public render() {
		return (
			<Form>
				<FormGroup className="row">
					<Label className="col-xl-2 col-lg-3 col-md-4 col-sm-4" for="crypto-name">
						Crypto Name:
					</Label>
					<Input
						className="col-xl-10 col-lg-9 col-md-8 col-sm-8"
						type="text"
						name="crypto-name"
						id="crypto-name"
						placeholder="Insert the name or the symbol of the crypto"
						onChange={this.onCryptoNameChange}
					/>
				</FormGroup>
			</Form>
		);
	}

	public onCryptoNameChange(event: any): void {
		const selectedName: string = event.target.value.trim().toUpperCase();
		this.setState(
			(prevState: IFilterCryptosState) => ({
				selectedName
			}),
			this.dispatchToggleCompanyVisibility
		);
	}

	public dispatchToggleCompanyVisibility(): void {
		this.props.toggleCryptoVisibility(this.state.selectedName);
	}
}

export default FilterCryptos;
