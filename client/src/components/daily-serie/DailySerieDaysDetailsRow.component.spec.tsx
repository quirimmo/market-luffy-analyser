import * as React from 'react';
import { shallow } from 'enzyme';
import DailySerieDaysDetailsRow from './DailySerieDaysDetailsRow.component';

let component: any;

describe('DailySerieDaysDetailsRow Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<DailySerieDaysDetailsRow label="label" value={1} className="class1 class2" />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should init the props', () => {
		expect(component.instance().props.label).toEqual('label');
		expect(component.instance().props.value).toEqual(1);
		expect(component.instance().props.className).toEqual('class1 class2');
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

		it('should display the value element', () => {
			expect(
				component
					.find('div')
					.at(2)
					.text()
			).toEqual('1');
		});

		it('should display the css classes to the value', () => {
			expect(
				component
					.find('div')
					.at(2)
					.hasClass('class1')
			).toBeTruthy();
			expect(
				component
					.find('div')
					.at(2)
					.hasClass('class2')
			).toBeTruthy();
		});
	});
});
