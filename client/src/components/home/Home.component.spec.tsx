import * as React from 'react';
import { shallow } from 'enzyme';
import Home from './Home.component';

let component: any;
const mockFetchDailySeries = jest.fn(() => {});

describe('Home Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<Home dailySeries={[]} fetchDailySeries={mockFetchDailySeries} />);
	});

	describe('Component', () => {
		it('should be defined', () => {
			expect(component).toBeDefined();
		});
	});
});
