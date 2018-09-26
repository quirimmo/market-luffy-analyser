import { connect } from 'react-redux';
import IStoreState from './../../models/IStoreState';
import Cryptos from './Cryptos.component';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		cryptos: state.cryptos
	};
};

const mapDispatchToProps: any = (dispatch: any, ownProps: any) => ({
	selectCrypto: (crypto: Crypto): void => {
		// dispatch(selectCompany(company));
	}
});

const CryptosPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(Cryptos);

export default CryptosPage;
