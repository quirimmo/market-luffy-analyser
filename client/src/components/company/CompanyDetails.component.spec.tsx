import * as React from 'react';
import { shallow } from 'enzyme';
import CompanyDetails from './CompanyDetails.component';
import Company from './../../models/Company';
import DailySerie from './../../models/DailySerie';
import DailySerieCardPriceChange from '../daily-serie/DailySerieCardPriceChange.component';

const company: Company = new Company('Symbol', 'Name', 0, 1, 'Sector', 'Industry');
company.dailySerie = new DailySerie('Symbol', 1, [2, 3], 4);
let component: any;

describe('CompanyDetails', () => {
	beforeEach(() => {
		component = shallow(<CompanyDetails company={company} />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	describe('render', () => {
		it('should display the table container for large screens', () => {
			const tableContainer = component.find('table');
			expect(tableContainer).toHaveLength(1);
			expect(tableContainer.hasClass('table d-none d-md-table')).toBeTruthy();
		});

		it('should display the div container for smaller screens', () => {
			const divContainer = component.find('.company-details-div-container');
			expect(divContainer).toHaveLength(1);
			expect(divContainer.hasClass('row d-block d-md-none')).toBeTruthy();
		});

		it('should display the DailySerieCardPriceChange component', () => {
			const divContainer = component.find(DailySerieCardPriceChange);
			expect(divContainer).toHaveLength(1);
			expect(divContainer.props().priceChange).toEqual([2, 3]);
		});
	});
});