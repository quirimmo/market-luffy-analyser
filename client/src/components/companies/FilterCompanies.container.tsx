import { connect } from 'react-redux';
import IStoreState from './../../models/IStoreState';
import FilterCompanies from './FilterCompanies.component';
import { toggleCompanyVisibility } from './../../actions/companies.action';

const mapStateToProps = (state: IStoreState, ownProps: any) => {
	return {
		sectors: ownProps.sectors
	};
};

const mapDispatchToProps: any = (dispatch: any, ownProps: any) => ({
	toggleCompanyVisibility: (companyName: string, companySectors: string[]): void => {
		dispatch(toggleCompanyVisibility(companyName, companySectors));
	}
});

const FilterCompaniesPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterCompanies);

export default FilterCompaniesPage;
