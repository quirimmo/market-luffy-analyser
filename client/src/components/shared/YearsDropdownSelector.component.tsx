import * as React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

interface IYearsDropdownSelectorProps {
	years: number[];
	onSelectYear: (year: number | undefined) => void;
}

interface IYearsDropdownSelectorState {
	dropdownOpen: boolean;
	selectedYear: number | undefined;
}

class YearsDropdownSelector extends React.Component<IYearsDropdownSelectorProps, IYearsDropdownSelectorState> {
	constructor(props: IYearsDropdownSelectorProps) {
		super(props);

		this.state = {
			dropdownOpen: false,
			selectedYear: undefined
		};

		this.toggle = this.toggle.bind(this);
		this.getToggleText = this.getToggleText.bind(this);
		this.isDisabled = this.isDisabled.bind(this);
		this.selectYear = this.selectYear.bind(this);
	}

	public render() {
		return (
			<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle className="font-size-1em" caret={true}>
					{this.getToggleText()}
				</DropdownToggle>
				<DropdownMenu className="font-size-1em">
					{Array.from(this.props.years).map((year: number) => (
						<DropdownItem
							className="font-size-1em"
							key={`dropdown-item-${year}`}
							onClick={this.selectYear.bind(this, year)}
							disabled={this.isDisabled(year)}
						>
							{year}
						</DropdownItem>
					))}
				</DropdownMenu>
			</ButtonDropdown>
		);
	}

	public toggle() {
		this.setState((prevState: IYearsDropdownSelectorState) => ({
			...prevState,
			dropdownOpen: !this.state.dropdownOpen
		}));
	}

	public getToggleText() {
		return this.state.selectedYear ? this.state.selectedYear : 'Select Year';
	}

	public isDisabled(year: number) {
		return !!this.state.selectedYear && this.state.selectedYear === year;
	}

	public selectYear(year: number) {
		this.setState(
			(prevState: IYearsDropdownSelectorState) => ({ ...prevState, selectedYear: year }),
			() => {
				this.props.onSelectYear(this.state.selectedYear);
			}
		);
	}
}

export default YearsDropdownSelector;
