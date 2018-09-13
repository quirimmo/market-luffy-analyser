import * as React from 'react';
import { shallow } from 'enzyme';
import SortCompanies from './SortCompanies.component';
import { ButtonDropdown, DropdownMenu, DropdownItem } from 'reactstrap';

let component: any;
const mockSortCompanies = jest.fn();

describe.only('SortCompanies Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<SortCompanies sortCompanies={mockSortCompanies} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the public methods', () => {
		expect(typeof component.instance().sortBy).toEqual('function');
		expect(typeof component.instance().isSortButtonDisabled).toEqual('function');
		expect(typeof component.instance().toggle).toEqual('function');
	});

	describe('init', () => {
		it('should init the state', () => {
			expect(component.state()).toEqual({
				dropdownOpen: false,
				activeSort: 'NAME'
			});
		});
	});

	describe('render', () => {
		it('should define the ButtonDropdown component', () => {
			const buttonDropdown = component.find(ButtonDropdown);
			expect(buttonDropdown).toHaveLength(1);
			expect(buttonDropdown.props().isOpen).toBeFalsy();
			expect(buttonDropdown.props().toggle).toEqual(component.instance().toggle);
		});

		it('should define the DropdownItem components', () => {
			const dropdownItems = component.find(DropdownItem);
			expect(dropdownItems).toHaveLength(4);
			expect(dropdownItems.at(0).props().children).toEqual('NAME');
			expect(dropdownItems.at(1).props().children).toEqual('SECTOR');
			expect(dropdownItems.at(2).props().children).toEqual('MARKET CAP');
			expect(dropdownItems.at(3).props().children).toEqual('SYMBOL');
		});
	});

	describe('sortBy', () => {
		const event = { target: { innerHTML: 'SECTOR' } };

		it('should set the activeSort property of the state', () => {
			component.instance().sortBy(event);
			expect(component.state().activeSort).toEqual('SECTOR');
		});

		it('should call the sortCompanies props with parameter', () => {
			component.instance().sortBy(event);
			expect(mockSortCompanies).toHaveBeenCalledWith('SECTOR');
		});
	});

	describe('isSortButtonDisabled', () => {
		beforeEach(() => {
			component.setState({ activeSort: 'active' });
		});

		it('should return false', () => {
			expect(component.instance().isSortButtonDisabled('inactive')).toBeFalsy();
		});

		it('should return true', () => {
			expect(component.instance().isSortButtonDisabled('active')).toBeTruthy();
		});
	});

	describe('toggle', () => {
		it('should toggle the dropdownOpen of the state', () => {
			component.instance().toggle();
			expect(component.state().dropdownOpen).toBeTruthy();
		});
	});
});
