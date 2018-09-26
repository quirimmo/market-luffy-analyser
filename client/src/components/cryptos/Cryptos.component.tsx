import * as React from 'react';
import Crypto from './../../models/Crypto';
import { Alert } from 'reactstrap';
import LoadingGears from '../shared/LoadingGears.component';

import './style.scss';
import CryptoCard from '../crypto/CryptoCard.component';
import SortCryptos from './SortCryptos.component';
import FilterCryptosPage from './FilterCryptos.container';

interface ICryptosProps {
	cryptos: Crypto[];
	selectCrypto: (crypto: Crypto | null) => void;
}

interface ICryptosState {
	isLoading: boolean;
}

class Cryptos extends React.Component<ICryptosProps, ICryptosState> {
	constructor(props: ICryptosProps) {
		super(props);
		this.state = {
			isLoading: true
		};
		this.onMapCrypto = this.onMapCrypto.bind(this);
		this.sortCryptos = this.sortCryptos.bind(this);
	}

	public render() {
		let mainContent: any;

		if (this.state.isLoading) {
			mainContent = <LoadingGears imgClasses="mt-5" />;
		} else {
			if (this.props.cryptos.length === 0) {
				mainContent = <Alert color="warning">The are no cryptos in the list</Alert>;
			} else {
				mainContent = (
					<div className="cryptos-section-wrapper">
						<FilterCryptosPage />
						<SortCryptos sortCryptos={this.sortCryptos} />
						<br />
						<div className="row text-center">{this.props.cryptos.filter((crypto: Crypto) => crypto.isVisible).map(this.onMapCrypto)}</div>
					</div>
				);
			}
		}

		return <div className="text-center justify-content-center">{mainContent}</div>;
	}

	public onMapCrypto(crypto: Crypto): JSX.Element | undefined {
		return crypto.isVisible ? (
			<div className="col-xl-1 col-lg-2 col-md-3 col-sm-4 col-6" key={crypto.symbol}>
				<CryptoCard selectCrypto={this.props.selectCrypto} crypto={crypto} />
			</div>
		) : (
			undefined
		);
	}

	public componentDidMount() {
		this.sortCryptos('NAME');
		this.setState({ isLoading: false });
	}

	public sortCryptos(activeSort: string): void {
		switch (activeSort) {
			case 'NAME':
				this.props.cryptos.sort((a: Crypto, b: Crypto): number => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));
				break;
			case 'SYMBOL':
				this.props.cryptos.sort((a: Crypto, b: Crypto): number => a.symbol.toUpperCase().localeCompare(b.symbol.toUpperCase()));
				break;
			default:
				this.props.cryptos.sort((a: Crypto, b: Crypto): number => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));
				break;
		}
		this.forceUpdate();
	}
}

export default Cryptos;
