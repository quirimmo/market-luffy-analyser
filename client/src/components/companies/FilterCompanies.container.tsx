import { connect } from 'react-redux';
import IStoreState from './../../models/IStoreState';
import FilterCompanies from './FilterCompanies.component';
import { filterCompanySectors } from './../../actions/filter-company-sector.action';
import { toggleCompanyVisibility } from './../../actions/companies.action';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		sectors: ownProps.sectors,
		companySectors: state.companySectors
	};
};

const mapDispatchToProps: any = (dispatch: any, ownProps: any) => ({
	filterCompanySectors: (companySectors: string[]): void => {
		dispatch(filterCompanySectors(companySectors));
	},
	toggleCompanyVisibility: (companyName: string): void => {
		dispatch(toggleCompanyVisibility(companyName));
	}
});

const FilterCompaniesPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterCompanies);

export default FilterCompaniesPage;
