import * as React from 'react';
import { shallow } from 'enzyme';
import Home from './Home.component';

let component: any;

describe('Home Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<Home />);
	});

	describe('Component', () => {
		it('should be defined', () => {
			expect(component).toBeDefined();
		});
	});
});
