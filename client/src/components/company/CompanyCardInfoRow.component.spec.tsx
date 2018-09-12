import * as React from 'react';
import { shallow } from 'enzyme';
import CompanyCardInfoRow from './CompanyCardInfoRow.component';

let component: any;

describe('CompanyCardInfoRow Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<CompanyCardInfoRow label="LABEL" value="VALUE" />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should init the props', () => {
		expect(component.instance().props.label).toEqual('LABEL');
		expect(component.instance().props.value).toEqual('VALUE');
	});

	describe('render', () => {
		it('should display a div row', () => {
			expect(component.find('.row')).toHaveLength(1);
		});

		it('should display the label', () => {
			expect(
				component
					.find('div')
					.at(1)
					.text()
			).toEqual('LABEL:');
		});

		it('should display the value', () => {
			expect(
				component
					.find('div')
					.at(2)
					.text()
			).toEqual('VALUE');
		});
	});
});
