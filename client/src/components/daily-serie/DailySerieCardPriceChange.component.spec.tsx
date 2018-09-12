import * as React from 'react';
import { shallow } from 'enzyme';
import DailySerieCardPriceChange from './DailySerieCardPriceChange.component';
import { Button, Collapse } from 'reactstrap';

let component: any;

describe('DailySerieCardPriceChange Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<DailySerieCardPriceChange priceChange={[1, 2, 3]} />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the public methods', () => {
		expect(typeof component.instance().toggle).toEqual('function');
		expect(typeof component.instance().getPriceChangesButtonText).toEqual('function');
	});

	it('should init the state', () => {
		expect(component.state()).toEqual({ isOpen: false });
	});

	describe('render', () => {
		it('should display the price change Button', () => {
			expect(component.find(Button)).toHaveLength(1);
			expect(component.find(Button).props().onClick).toEqual(component.instance().toggle);
			expect(component.find(Button).props().children).toEqual('Show Price Changes');
		});

		it('should display the Collapse element', () => {
			expect(component.find(Collapse)).toHaveLength(1);
			expect(component.find(Button).props().isOpen).toBeFalsy();
		});

		it('should display the price change elements', () => {
			expect(component.find('div.price-change-value')).toHaveLength(3);
			expect(
				component
					.find('div.price-change-value')
					.at(0)
					.text()
			).toEqual('1.00%');
			expect(
				component
					.find('div.price-change-value')
					.at(1)
					.text()
			).toEqual('2.00%');
			expect(
				component
					.find('div.price-change-value')
					.at(2)
					.text()
			).toEqual('3.00%');
		});
	});

	describe('toggle', () => {
		it('should change the isOpen property of the state', () => {
			component.instance().toggle();
			expect(component.state().isOpen).toBeTruthy();
		});
	});

	describe('getPriceChangesButtonText', () => {
		it('should return the text for opening the price changes', () => {
			expect(component.instance().getPriceChangesButtonText()).toEqual('Show Price Changes');
		});

		it('should return the text for closing the price changes', () => {
			component.setState({ isOpen: true });
			expect(component.instance().getPriceChangesButtonText()).toEqual('Hide Price Changes');
		});
	});
});
