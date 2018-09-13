import * as React from 'react';
import { shallow } from 'enzyme';
import FilterCompanies from './FilterCompanies.component';
import { Form, FormGroup } from 'reactstrap';

let component: any;
const filledSectors: string[] = ['Sector 1', 'Sector 2', 'Sector 3'];
const sectors: string[] = [];
const mockToggleCompanyVisibility = jest.fn();

describe.only('Filter Companies Component', () => {
	beforeEach(() => {
		component = shallow(<FilterCompanies sectors={sectors} toggleCompanyVisibility={mockToggleCompanyVisibility} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the public methods', () => {
		expect(typeof component.instance().onCompanyNameChange).toEqual('function');
		expect(typeof component.instance().onCompanySectorChange).toEqual('function');
		expect(typeof component.instance().dispatchToggleCompanyVisibility).toEqual('function');
		expect(typeof component.instance().componentDidUpdate).toEqual('function');
	});

	describe('init', () => {
		it('should init the sectors prop', () => {
			expect(component.instance().props.sectors).toEqual(sectors);
		});

		it('should init the state', () => {
			component.setProps({ sectors: filledSectors });
			expect(component.state()).toEqual({
				selectedName: '',
				selectedSectors: new Set(['SECTOR 1', 'SECTOR 2', 'SECTOR 3'])
			});
		});
	});

	describe('render', () => {
		it('should define the Form component', () => {
			expect(component.find(Form)).toHaveLength(1);
		});

		it('should define 3 FormGroup components', () => {
			expect(component.find(FormGroup)).toHaveLength(3);
		});

		it('should define label of the company name input', () => {
			const labelCompanyName = component.find('[for="commpany-name"]');
			expect(labelCompanyName).toHaveLength(1);
			expect(labelCompanyName.props().children).toEqual('Company Name:');
		});

		it('should define the company name input', () => {
			const inputCompanyName = component.find('#commpany-name');
			expect(inputCompanyName).toHaveLength(1);
			expect(inputCompanyName.props().onChange).toEqual(component.instance().onCompanyNameChange);
		});

		it('should define a checkbox for each sector', () => {
			component.setProps({ sectors: filledSectors });
			const checkboxSectors = component.find('[type="checkbox"]');
			expect(checkboxSectors).toHaveLength(3);
			expect(checkboxSectors.at(0).props().defaultChecked).toBeTruthy();
			expect(checkboxSectors.at(0).props().onChange).toEqual(component.instance().onCompanySectorChange);
			expect(component.find('[for="Sector 1"]').props().children).toContain('Sector 1');
			expect(component.find('[for="Sector 2"]').props().children).toContain('Sector 2');
			expect(component.find('[for="Sector 3"]').props().children).toContain('Sector 3');
		});
	});

	describe('onCompanyNameChange', () => {
		const event = { target: { value: 'company name' } };
		it('should set the state', () => {
			component.instance().onCompanyNameChange(event);
			expect(component.state().selectedName).toEqual('COMPANY NAME');
		});

		it('should call the dispatchToggleCompanyVisibility method', () => {
			const spy = spyOn(component.instance(), 'dispatchToggleCompanyVisibility');
			component.instance().onCompanyNameChange(event);
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('onCompanySectorChange', () => {
		describe('general', () => {
			const event = { target: { id: 'Sector 1' } };
			it('should call the dispatchToggleCompanyVisibility method', () => {
				const spy = spyOn(component.instance(), 'dispatchToggleCompanyVisibility');
				component.instance().onCompanySectorChange(event);
				expect(spy).toHaveBeenCalled();
			});
		});

		describe('checked', () => {
			const event = { target: { id: 'Sector 1', checked: true } };

			it('should add the checked sector to the state', () => {
				component.instance().onCompanySectorChange(event);
				expect(component.state().selectedSectors).toEqual(new Set(['SECTOR 1']));
			});
		});

		describe('unchecked', () => {
			const event = { target: { id: 'Sector 1', checked: false } };

			it('should remove the unchecked sector from the state', () => {
				component.setProps({ sectors: filledSectors });
				component.instance().onCompanySectorChange(event);
				expect(component.state().selectedSectors).toEqual(new Set(['SECTOR 2', 'SECTOR 3']));
			});
		});
	});

	describe('dispatchToggleCompanyVisibility', () => {
		it('should call the toggleCompanyVisibility with the parameters', () => {
			component.setProps({ sectors: filledSectors });
			component.setState({ selectedName: 'name'});
			component.instance().dispatchToggleCompanyVisibility();
			expect(mockToggleCompanyVisibility).toHaveBeenCalledWith('name', ['SECTOR 1', 'SECTOR 2', 'SECTOR 3']);
		});
	});
});
