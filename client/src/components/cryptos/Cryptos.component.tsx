import * as React from 'react';
import Crypto from './../../models/Crypto';
import { Alert } from 'reactstrap';
import LoadingGears from '../shared/LoadingGears.component';

import './style.scss';
import CryptoCard from '../crypto/CryptoCard.component';

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
		this.setState({ isLoading: false });
	}
}

export default Cryptos;
