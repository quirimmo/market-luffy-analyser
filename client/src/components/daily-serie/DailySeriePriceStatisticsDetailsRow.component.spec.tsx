import * as React from 'react';
import { shallow } from 'enzyme';
import DailySeriePriceStatisticsDetailsRow from './DailySeriePriceStatisticsDetailsRow.component';
import NumberFormatter from '../shared/NumberFormatter.component';

let component: any;

describe('DailySeriePriceStatisticsDetailsRow Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<DailySeriePriceStatisticsDetailsRow label="label" value={1} time="time" className="class1 class2" />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should init the props', () => {
		expect(component.instance().props.label).toEqual('label');
		expect(component.instance().props.value).toEqual(1);
		expect(component.instance().props.time).toEqual('time');
		expect(component.instance().props.className).toEqual('class1 class2');
	});

	it('should expose the public methods', () => {
		expect(typeof component.instance().getContent).toEqual('function');
	});

	describe('render', () => {
		it('should display the div elements', () => {
			expect(component.find('div')).toHaveLength(3);
		});

		it('should display the label', () => {
			expect(
				component
					.find('div')
					.at(1)
					.text()
			).toEqual('label');
		});

		it('should display the NumberFormatter component', () => {
			const numberFormatter = component.find(NumberFormatter);
			expect(numberFormatter).toHaveLength(1);
			expect(numberFormatter.props().className).toEqual('class1 class2');
			expect(numberFormatter.props().value).toEqual(1);
			expect(numberFormatter.props().suffix).toEqual('$');
			expect(numberFormatter.props().suffix).toEqual('$');
		});

		it('should display the time', () => {
			expect(component.find('span').text()).toEqual('(time)');
		});
	});

	describe('getContent', () => {
		afterEach(() => {
			component.setProps({
				time: 'time'
			});
		});

		it('should return the not available text for the time', () => {
			component.setProps({
				time: 'Invalid date'
			});
			expect(component.instance().getContent()).toEqual(<span className="font-italic daily-serie-price-times">Not Available</span>);
		});

		describe('time block', () => {
			let children: any;
			beforeEach(() => {
				children = component.instance().getContent().props.children;
			});

			it('should return 3 elements', () => {
				expect(children).toHaveLength(3);
			});

			it('should return the number formatter element', () => {
				expect(children[0].props.className).toEqual('class1 class2');
				expect(children[0].props.value).toEqual(1);
				expect(children[0].props.suffix).toEqual('$');
			});

			it('should return the empty space element', () => {
				expect(children[1]).toEqual(' ');
			});

			it('should return the time element', () => {
				expect(children[2].props.children.join('')).toEqual('(time)');
			});
		});
	});
});
