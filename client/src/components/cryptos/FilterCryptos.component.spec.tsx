import * as React from 'react';
import { shallow } from 'enzyme';
import FilterCryptos from './FilterCryptos.component';
import { Form, FormGroup } from 'reactstrap';

let component: any;
const mockToggleCryptoVisibility = jest.fn();

describe.only('Filter Cryptos Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<FilterCryptos toggleCryptoVisibility={mockToggleCryptoVisibility} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the public methods', () => {
		expect(typeof component.instance().onCryptoNameChange).toEqual('function');
		expect(typeof component.instance().dispatchToggleCryptoVisibility).toEqual('function');
	});

	it('should init the state', () => {
		expect(component.state()).toEqual({
			selectedName: ''
		});
	});

	describe('render', () => {
		it('should display the Form component', () => {
			expect(component.find(Form)).toHaveLength(1);
		});

		it('should display the FormGroup component', () => {
			expect(component.find(FormGroup)).toHaveLength(1);
		});

		it('should display the label of the crypto name input', () => {
			const labelCryptoName = component.find('[for="crypto-name"]');
			expect(labelCryptoName).toHaveLength(1);
			expect(labelCryptoName.props().children).toEqual('Crypto Name:');
		});

		it('should define the crypto name input', () => {
			const inputCryptoName = component.find('#crypto-name');
			expect(inputCryptoName).toHaveLength(1);
			expect(inputCryptoName.props().onChange).toEqual(component.instance().onCryptoNameChange);
		});
	});

	describe('onCryptoNameChange', () => {
		const event = { target: { value: 'crypto name' } };
		it('should set the state', () => {
			component.instance().onCryptoNameChange(event);
			expect(component.state().selectedName).toEqual('CRYPTO NAME');
		});

		it('should call the dispatchToggleCryptoVisibility method', () => {
			const spy = spyOn(component.instance(), 'dispatchToggleCryptoVisibility');
			component.instance().onCryptoNameChange(event);
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('dispatchToggleCryptoVisibility', () => {
		it('should call the dispatchToggleCryptoVisibility with the parameters', () => {
			component.setState({ selectedName: 'name' });
			component.instance().dispatchToggleCryptoVisibility();
			expect(mockToggleCryptoVisibility).toHaveBeenCalledWith('name');
		});
	});
});
