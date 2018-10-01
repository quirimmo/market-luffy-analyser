import * as React from 'react';

import './example-d3.scss';
import D3PieChart, { ID3PieChartData } from './D3PieChart.component';

class ExampleD3 extends React.Component {
	public pieChartData: ID3PieChartData[] = [
		{
			label: 'Adolfo',
			value: 10,
			innerText: '10%'
		},
		{
			label: 'Fernandiello bello bello bello',
			value: 40,
			innerText: '40%'
		},
		{
			label: 'Lustri',
			value: 20,
			innerText: '20%'
		},
		{
			label: 'Cross',
			value: 20,
			innerText: '20%'
		},
		{
			label: 'Tony Moda',
			value: 10,
			innerText: '10%'
		}
	];

	constructor(props: any) {
		super(props);
		this.onPieChartClick = this.onPieChartClick.bind(this);
	}

	public render() {
		return (
			<div>
				<D3PieChart id="pie-chart-example" data={this.pieChartData} onPieChartClick={this.onPieChartClick} />
			</div>
		);
	}

	public onPieChartClick(d: any, element: any): void {
		console.log('I am a click from outside!', d, element);
	}
}

export default ExampleD3;
