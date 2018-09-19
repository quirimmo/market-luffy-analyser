import * as React from 'react';
import { shallow } from 'enzyme';
import LoadingGears from './LoadingGears.component';

const width = '60px';
const height = '50px';
const imgClasses = 'class1 class2';
let component: any;

describe('LoadingGears', () => {
	beforeEach(() => {
		component = shallow(<LoadingGears width={width} height={height} imgClasses={imgClasses} />);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	describe('render', () => {
		let divContainer: any;
		let img: any;

		beforeEach(() => {
			divContainer = component.find('div');
			img = component.find('img');
		});

		it('should display the div container', () => {
			expect(divContainer).toHaveLength(1);
			expect(divContainer.hasClass('loading-component')).toBeTruthy();
		});

		it('should display the img element', () => {
			expect(img).toHaveLength(1);
		});

		it('should set the src attribute', () => {
			expect(img.get(0).props.src).toEqual('./../images/gear-animation-orange.gif');
		});

		it('should add the width attribute', () => {
			expect(img.get(0).props.width).toEqual('60px');
		});

		it('should add the height attribute', () => {
			expect(img.get(0).props.height).toEqual('50px');
		});

		it('should add the css classes', () => {
			expect(img.hasClass('class1')).toBeTruthy();
			expect(img.hasClass('class2')).toBeTruthy();
		});
	});
});
