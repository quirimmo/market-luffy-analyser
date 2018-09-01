import * as React from 'react';
import { shallow } from 'enzyme';
import AppTitle from './AppTitle.component';
import { Badge, Row, Col } from 'reactstrap';

let component: any;

describe('App Title Presentational Component', () => {
	beforeEach(() => {
		component = shallow(<AppTitle />);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should define the header', () => {
		expect(component.find('header')).toHaveLength(1);
	});

	it('should define the Row component', () => {
		expect(component.find(Row)).toHaveLength(1);
	});

	it('should define the Col component', () => {
		expect(component.find(Col)).toHaveLength(1);
	});

	it('should define the h2 with the right class', () => {
		const h2 = component.find('h2');
		expect(h2).toHaveLength(1);
		expect(h2.hasClass('main-app-title')).toBeTruthy();
	});

	it('should define the Badge component with the right text', () => {
		const badgeElement = component.find(Badge);
		expect(badgeElement).toHaveLength(1);
		expect(badgeElement.dive().text()).toEqual('Market Luffy Analyser');
	});
});
