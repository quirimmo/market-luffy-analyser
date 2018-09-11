import * as React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownItem } from 'reactstrap';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';

interface ISortCompaniesState {
	dropdownOpen: boolean;
	activeSort: string;
}

interface ISortCompaniesProps {
	sortCompanies: (activeSort: string) => void;
}

class SortCompanies extends React.Component<ISortCompaniesProps, ISortCompaniesState> {
	public constructor(props: ISortCompaniesProps) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false,
			activeSort: 'NAME'
		};

		this.sortBy = this.sortBy.bind(this);
	}

	public render() {
		return (
			<div className="row text-center justify-content-center">
				<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
					<DropdownToggle color="primary" caret={true}>
						Sort Companies By <b>{this.state.activeSort}</b>
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem disabled={this.isSortButtonDisabled('NAME')} onClick={this.sortBy}>
							NAME
						</DropdownItem>
						<DropdownItem disabled={this.isSortButtonDisabled('SECTOR')} onClick={this.sortBy}>
							SECTOR
						</DropdownItem>
						<DropdownItem disabled={this.isSortButtonDisabled('MARKET CAP')} onClick={this.sortBy}>
							MARKET CAP
						</DropdownItem>
						<DropdownItem disabled={this.isSortButtonDisabled('SYMBOL')} onClick={this.sortBy}>
							SYMBOL
						</DropdownItem>
					</DropdownMenu>
				</ButtonDropdown>
			</div>
		);
	}

	public sortBy(event: any) {
		const sortParameter: string = event.target.innerHTML;
		this.setState(
			(prevState: ISortCompaniesState) => ({
				...prevState,
				activeSort: sortParameter
			}),
			() => {
				this.props.sortCompanies(this.state.activeSort);
			}
		);
	}

	public isSortButtonDisabled(sortText: string) {
		return sortText === this.state.activeSort;
	}

	public toggle() {
		this.setState((prevState: ISortCompaniesState) => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}
}

export default SortCompanies;
