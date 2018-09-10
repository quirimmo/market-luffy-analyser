import { connect } from 'react-redux';
import IStoreState from './../../models/IStoreState';
import { filterCompanyName } from './../../actions/filter-company-name.action';
import FilterCompanies from './FilterCompanies.component';
import { filterCompanySectors } from './../../actions/filter-company-sector.action';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		sectors: ownProps.sectors,
		companySectors: state.companySectors
	};
};

const mapDispatchToProps: any = (dispatch: any, ownProps: any) => ({
	filterCompanyName: (companyName: string): void => {
		dispatch(filterCompanyName(companyName));
	},
	filterCompanySectors: (companySectors: string[]): void => {
		dispatch(filterCompanySectors(companySectors));
	}
});

const FilterCompaniesPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterCompanies);

export default FilterCompaniesPage;
