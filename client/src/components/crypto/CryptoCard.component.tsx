import * as React from 'react';
import Crypto from './../../models/Crypto';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import './style.scss';

export interface ICryptoCardProps {
	selectCrypto: (crypto: Crypto | null) => void;
	crypto: Crypto;
	match: any;
	location: any;
	history: any;
}

export class CryptoCard extends React.Component<ICryptoCardProps, any> {
	constructor(props: ICryptoCardProps) {
		super(props);
		this.openCryptoPage = this.openCryptoPage.bind(this);
	}

	public render() {
		return (
			<article className="crypto-card">
				<div className="row text-center justify-content-center font-weight-bold">{this.props.crypto.name}</div>
				<div className="row text-center justify-content-center font-italic small">{this.props.crypto.symbol}</div>
				<Button color="success" className="mt-2 mb-1 crypto-page-button text-center" onClick={this.openCryptoPage}>
					Crypto Page
				</Button>
			</article>
		);
	}

	public openCryptoPage() {
		this.props.selectCrypto(this.props.crypto);
		this.props.history.push(`/crypto/${this.props.crypto.symbol}`);
	}
}

export default withRouter(CryptoCard);
