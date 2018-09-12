import * as React from 'react';
import { shallow } from 'enzyme';
import DailySerieCardInfoRow from './DailySerieCardInfoRow.component';

let component: any;

describe('DailySerieCardInfoRow Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<DailySerieCardInfoRow label="LABEL" value="VALUE" classes="class1 class2" />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	describe('render', () => {
		it('should display the div row', () => {
			expect(component.find('div.row')).toHaveLength(1);
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

		it('should add the css classes to the value element', () => {
			expect(
				component
					.find('div')
					.at(2)
					.hasClass('class1') &&
					component
						.find('div')
						.at(2)
						.hasClass('class2')
			).toBeTruthy();
		});
	});
});
