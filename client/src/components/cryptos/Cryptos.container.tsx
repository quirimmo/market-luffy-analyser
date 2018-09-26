import { connect } from 'react-redux';
import IStoreState from './../../models/IStoreState';
import Cryptos from './Cryptos.component';
import { selectCrypto } from './../../actions/crypto.action';
import Crypto from './../../models/Crypto';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		cryptos: state.cryptos
	};
};

const mapDispatchToProps: any = (dispatch: any, ownProps: any) => ({
	selectCrypto: (crypto: Crypto): void => {
		dispatch(selectCrypto(crypto));
	}
});

const CryptosPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(Cryptos);

export default CryptosPage;
