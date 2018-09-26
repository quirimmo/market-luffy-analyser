import * as React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownItem } from 'reactstrap';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';

interface ISortCryptosState {
	dropdownOpen: boolean;
	activeSort: string;
}

interface ISortCryptosProps {
	sortCryptos: (activeSort: string) => void;
}

class SortCryptos extends React.Component<ISortCryptosProps, ISortCryptosState> {
	public constructor(props: ISortCryptosProps) {
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
						Sort Cryptos By <b>{this.state.activeSort}</b>
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem disabled={this.isSortButtonDisabled('NAME')} onClick={this.sortBy}>
							NAME
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
			(prevState: ISortCryptosState) => ({
				...prevState,
				activeSort: sortParameter
			}),
			() => {
				this.props.sortCryptos(this.state.activeSort);
			}
		);
	}

	public isSortButtonDisabled(sortText: string) {
		return sortText === this.state.activeSort;
	}

	public toggle() {
		this.setState((prevState: ISortCryptosState) => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}
}

export default SortCryptos;
