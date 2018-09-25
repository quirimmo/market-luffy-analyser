import * as React from 'react';
import { shallow } from 'enzyme';
import YearsDropdownSelector from './YearsDropdownSelector.component';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const years = [2018, 2017, 2016];
const mockOnSelectYear = jest.fn();
let component: any;

describe('YearsDropdownSelector', () => {
	beforeEach(() => {
		component = shallow(<YearsDropdownSelector years={years} onSelectYear={mockOnSelectYear} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should init the props', () => {
		expect(component.instance().props.years).toEqual(years);
	});

	it('should init the state', () => {
		expect(component.state().dropdownOpen).toBeFalsy();
		expect(component.state().selectedYear).toBeUndefined();
	});

	it('should expose the public methods', () => {
		expect(typeof component.instance().toggle).toEqual('function');
		expect(typeof component.instance().getToggleText).toEqual('function');
		expect(typeof component.instance().isDisabled).toEqual('function');
		expect(typeof component.instance().selectYear).toEqual('function');
	});

	describe('render', () => {
		it('should display the ButtonDropdown component', () => {
			expect(component.find(ButtonDropdown)).toHaveLength(1);
		});

		it('should display the DropdownToggle component', () => {
			expect(component.find(DropdownToggle)).toHaveLength(1);
		});

		it('should display the DropdownMenu component', () => {
			expect(component.find(DropdownMenu)).toHaveLength(1);
		});

		it('should display a DropdownItem component for each year', () => {
			expect(component.find(DropdownItem)).toHaveLength(3);
			expect(
				component
					.find(DropdownItem)
					.at(0)
					.props().children
			).toEqual(2018);
			expect(
				component
					.find(DropdownItem)
					.at(1)
					.props().children
			).toEqual(2017);
			expect(
				component
					.find(DropdownItem)
					.at(2)
					.props().children
			).toEqual(2016);
		});
	});

	describe('toggle', () => {
		it('should toggle the dropdownOpen state', () => {
			expect(component.state().dropdownOpen).toBeFalsy();
			component.instance().toggle();
			expect(component.state().dropdownOpen).toBeTruthy();
			component.instance().toggle();
			expect(component.state().dropdownOpen).toBeFalsy();
		});
	});

	describe('getToggleText', () => {
		it('should return a placeholder if the selectedYear is undefined', () => {
			expect(component.instance().getToggleText()).toEqual('Select Year');
		});

		it('should return the selected year if not undefined', () => {
			component.setState({ selectedYear: 2018 });
			expect(component.instance().getToggleText()).toEqual(2018);
		});
	});

	describe('isDisabled', () => {
		it('should return false if the selected year has not been selected yet', () => {
			expect(component.instance().isDisabled(2017)).toBeFalsy();
		});

		it('should return false if the selected year is different from the given year', () => {
			component.setState({ selectedYear: 2018 });
			expect(component.instance().isDisabled(2017)).toBeFalsy();
		});

		it('should return true if the selected year is equal from the given year', () => {
			component.setState({ selectedYear: 2018 });
			expect(component.instance().isDisabled(2018)).toBeTruthy();
		});
	});

	describe('selectYear', () => {
		it('should set the state selected year property', () => {
			component.instance().selectYear(2018);
			expect(component.state().selectedYear).toEqual(2018);
		});

		it('should call the onSelectYear prop with the selected year', () => {
			component.instance().selectYear(2018);
			expect(mockOnSelectYear).toHaveBeenCalledWith(2018);
		});
	});
});
