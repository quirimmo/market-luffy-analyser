import { connect } from 'react-redux';
import IStoreState from './../../models/IStoreState';
import FilterCryptos from './FilterCryptos.component';
import { toggleCryptoVisibility } from './../../actions/cryptos.action';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {};
};

const mapDispatchToProps: any = (dispatch: any, ownProps: any) => ({
	toggleCryptoVisibility: (cryptoName: string): void => {
		dispatch(toggleCryptoVisibility(cryptoName));
	}
});

const FilterCryptosPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterCryptos);

export default FilterCryptosPage;
