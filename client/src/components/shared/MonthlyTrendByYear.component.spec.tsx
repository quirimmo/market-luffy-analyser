import * as React from 'react';
import { shallow } from 'enzyme';
import DailySerie from './../../models/DailySerie';
import MonthlyTrendByYear from '../shared/MonthlyTrendByYear.component';
import PercentageFormatter from './PercentageFormatter.component';

const dailySerie: DailySerie = new DailySerie('Symbol', 0, [1, 2], 3);
let component: any;

describe('MonthlyTrendByYear Presentational Component', () => {
	beforeEach(() => {
		spyOn(dailySerie, 'getYearMonthTrend').and.returnValue(1);
		component = shallow(<MonthlyTrendByYear dailySerie={dailySerie} year={1} className="class1 class2" />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should init the props', () => {
		expect(component.instance().props.year).toEqual(1);
		expect(component.instance().props.dailySerie).toEqual(dailySerie);
		expect(component.instance().props.className).toEqual('class1 class2');
	});

	it('should expose the public methods', () => {
		expect(typeof component.instance().getYearMonthValue).toEqual('function');
	});

	describe('render', () => {
		it('should display a div element for each month', () => {
			expect(component.find('.month-container')).toHaveLength(12);
		});

		it('should display the January month', () => {
			const month = component.find('.month-container').at(0);
			expect(month.hasClass('class1')).toBeTruthy();
			expect(month.hasClass('class2')).toBeTruthy();
			expect(month.key()).toEqual('1-0');
			expect(month.text()).toContain('January');
		});

		it('should display the February month', () => {
			const month = component.find('.month-container').at(1);
			expect(month.hasClass('class1')).toBeTruthy();
			expect(month.hasClass('class2')).toBeTruthy();
			expect(month.key()).toEqual('1-1');
			expect(month.text()).toContain('February');
		});

		it('should display the March month', () => {
			const month = component.find('.month-container').at(2);
			expect(month.hasClass('class1')).toBeTruthy();
			expect(month.hasClass('class2')).toBeTruthy();
			expect(month.key()).toEqual('1-2');
			expect(month.text()).toContain('March');
		});

		it('should display the April month', () => {
			const month = component.find('.month-container').at(3);
			expect(month.hasClass('class1')).toBeTruthy();
			expect(month.hasClass('class2')).toBeTruthy();
			expect(month.key()).toEqual('1-3');
			expect(month.text()).toContain('April');
		});

		it('should display the May month', () => {
			const month = component.find('.month-container').at(4);
			expect(month.hasClass('class1')).toBeTruthy();
			expect(month.hasClass('class2')).toBeTruthy();
			expect(month.key()).toEqual('1-4');
			expect(month.text()).toContain('May');
		});

		it('should display the June month', () => {
			const month = component.find('.month-container').at(5);
			expect(month.hasClass('class1')).toBeTruthy();
			expect(month.hasClass('class2')).toBeTruthy();
			expect(month.key()).toEqual('1-5');
			expect(month.text()).toContain('June');
		});

		it('should display the July month', () => {
			const month = component.find('.month-container').at(6);
			expect(month.hasClass('class1')).toBeTruthy();
			expect(month.hasClass('class2')).toBeTruthy();
			expect(month.key()).toEqual('1-6');
			expect(month.text()).toContain('July');
		});

		it('should display the August month', () => {
			const month = component.find('.month-container').at(7);
			expect(month.hasClass('class1')).toBeTruthy();
			expect(month.hasClass('class2')).toBeTruthy();
			expect(month.key()).toEqual('1-7');
			expect(month.text()).toContain('August');
		});

		it('should display the September month', () => {
			const month = component.find('.month-container').at(8);
			expect(month.hasClass('class1')).toBeTruthy();
			expect(month.hasClass('class2')).toBeTruthy();
			expect(month.key()).toEqual('1-8');
			expect(month.text()).toContain('September');
		});

		it('should display the October month', () => {
			const month = component.find('.month-container').at(9);
			expect(month.hasClass('class1')).toBeTruthy();
			expect(month.hasClass('class2')).toBeTruthy();
			expect(month.key()).toEqual('1-9');
			expect(month.text()).toContain('October');
		});

		it('should display the November month', () => {
			const month = component.find('.month-container').at(10);
			expect(month.hasClass('class1')).toBeTruthy();
			expect(month.hasClass('class2')).toBeTruthy();
			expect(month.key()).toEqual('1-10');
			expect(month.text()).toContain('November');
		});

		it('should display the December month', () => {
			const month = component.find('.month-container').at(11);
			expect(month.hasClass('class1')).toBeTruthy();
			expect(month.hasClass('class2')).toBeTruthy();
			expect(month.key()).toEqual('1-11');
			expect(month.text()).toContain('December');
		});
	});

	describe('getYearMonthValue', () => {
		it('should return the PercentageFormatter component', () => {
			expect(component.instance().getYearMonthValue(1, 1)).toEqual(<PercentageFormatter value={1} />);
		});
	});
});
