import * as React from 'react';
import { shallow } from 'enzyme';
import NumberFormatter from './NumberFormatter.component';

let component: any;

describe('NumberFormatter', () => {
	beforeEach(() => {
		component = shallow(<NumberFormatter value={50} />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	describe('render', () => {
		it('should display the span container', () => {
			expect(component.find('span')).toHaveLength(1);
		});

		it('should display the formatted number adding decimals and not changing the integers', () => {
			expect(component.text()).toEqual('50.00');
		});

		it('should display the formatted number as it is', () => {
			const comp = shallow(<NumberFormatter value={0.7} />);
			expect(comp.text()).toEqual('0.7000');
		});

		it('should display the formatted number corrected', () => {
			const comp = shallow(<NumberFormatter value={1234567.89} />);
			expect(comp.text()).toEqual('1,234,568');
		});

		it('should display the formatted number corrected', () => {
			const comp = shallow(<NumberFormatter value={111234567.89} />);
			expect(comp.text()).toEqual('111,234,568');
		});

		it('should display the formatted number corrected', () => {
			const comp = shallow(<NumberFormatter value={11234567} />);
			expect(comp.text()).toEqual('11,234,567');
		});

		it('should display the formatted number corrected with the suffix', () => {
			const comp = shallow(<NumberFormatter value={11234567} suffix="$"/>);
			expect(comp.text()).toEqual('11,234,567$');
		});
	});
});
