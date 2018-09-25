import * as React from 'react';
import { shallow } from 'enzyme';
import DailySerieTrendDetailsRow from './DailySerieTrendDetailsRow.component';
import PercentageFormatter from '../shared/PercentageFormatter.component';

let component: any;

describe('DailySerieTrendDetailsRow Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<DailySerieTrendDetailsRow label="label" value={1} />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should init the props', () => {
		expect(component.instance().props.label).toEqual('label');
		expect(component.instance().props.value).toEqual(1);
	});

	describe('render', () => {
		it('should display the div elements', () => {
			expect(component.find('div')).toHaveLength(3);
		});

		it('should display the label element', () => {
			expect(
				component
					.find('div')
					.at(1)
					.text()
			).toEqual('label');
		});

		it('should display the PercentageFormatter component', () => {
			const percentageFormatter = component.find(PercentageFormatter);
			expect(percentageFormatter).toHaveLength(1);
			expect(percentageFormatter.props().value).toEqual(1);
		});
	});
});
