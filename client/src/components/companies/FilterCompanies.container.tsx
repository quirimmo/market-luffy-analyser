import { connect } from 'react-redux';
import IStoreState from './../../models/IStoreState';
import { filterCompanyName } from './../../actions/filter-company-name.action';
import FilterCompanies from './FilterCompanies.component';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		companyName: state.companyName,
		sectors: ownProps.sectors
	};
};

const mapDispatchToProps: any = (dispatch: any, ownProps: any) => ({
	filterCompanyName: (companyName: string): void => {
		dispatch(filterCompanyName(companyName));
	}
});

const FilterCompaniesPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterCompanies);

export default FilterCompaniesPage;
