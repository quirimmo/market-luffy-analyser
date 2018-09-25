import * as React from 'react';
import { shallow } from 'enzyme';
import PercentageFormatter from './PercentageFormatter.component';
import NumberFormatter from './NumberFormatter.component';

let component: any;

describe('PercentageFormatter', () => {
	beforeEach(() => {
		component = shallow(<PercentageFormatter value={50} />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	describe('render', () => {
		it('should display the NumberFormatter component', () => {
			const numberFormatter = component.find(NumberFormatter);
			expect(numberFormatter.props().value).toEqual(50);
			expect(numberFormatter.props().suffix).toEqual('%');
		});
	});
});
