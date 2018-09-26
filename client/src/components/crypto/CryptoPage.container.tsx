import { connect } from 'react-redux';
import IStoreState from './../../models/IStoreState';
import CryptoPage from './CryptoPage.component';
import { Observable } from 'rxjs';
import { fetchCryptoThunk } from './../../actions/crypto.action';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		crypto: state.selectedCrypto
	};
};

const mapDispatchToProps: any = (dispatch: any, ownProps: any) => ({
	fetchCrypto: (): Observable<boolean> => {
		return dispatch(fetchCryptoThunk(ownProps.cryptoSymbol));
	}
});

const CryptoPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CryptoPage);

export default CryptoPageContainer;
