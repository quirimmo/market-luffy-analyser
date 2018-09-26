import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './style.scss';

interface IAppNavigationState {
	isMenuOpen: boolean;
}

class AppNavigation extends React.Component<any, IAppNavigationState> {
	constructor(props: any) {
		super(props);
		this.state = { isMenuOpen: false };
	}

	public render() {
		return (
			<nav>
				<Menu isOpen={this.state.isMenuOpen}>
					<NavLink to="/home">Home</NavLink>
					<NavLink to="/companies">Companies</NavLink>
					<NavLink to="/cryptos">Cryptos</NavLink>
				</Menu>
			</nav>
		);
	}
}

export default AppNavigation;
