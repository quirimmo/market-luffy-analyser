import * as React from 'react';
import * as d3 from 'd3';

import './example-d3.scss';
import D3PieChart, { ID3PieChartData } from './D3PieChart.component';

class ExampleD3 extends React.Component {
	public pieChartData: ID3PieChartData[] = [
		{
			label: 'Adolfo',
			value: 10
		},
		{
			label: 'Fernandiello bello bello bello',
			value: 40
		},
		{
			label: 'Lustri',
			value: 20
		},
		{
			label: 'Cross',
			value: 20
		},
		{
			label: 'Tony Moda',
			value: 10
		}
	];

	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<div>
				<D3PieChart data={this.pieChartData} />
				<br />
				<br />
				<div id="svgcontainer" />
				<ul id="list" />
			</div>
		);
	}

	public componentDidMount() {
		// d3.select('#list')
		// 	.selectAll('li')
		// 	.data([10, 20, 30, 25, 15])
		// 	.enter()
		// 	.append('li')
		// 	.text((d: any) => {
		// 		console.log('item', d);
		// 		return d;
		// 	});

		// svg
		// 	.append('line')
		// 	.attr('x1', 100)
		// 	.attr('y1', 100)
		// 	.attr('x2', 200)
		// 	.attr('y2', 200)
		// 	.style('stroke', 'rgb(255,0,0)')
		// 	.style('stroke-width', 2);

		// const t: any = d3
		// 	.transition()
		// 	.attr('fill', 'lightblue')
		// 	.duration(2000);

		// svg
		// 	.append('ellipse')
		// 	.attr('cx', 200)
		// 	.attr('cy', 50)
		// 	.attr('rx', 100)
		// 	.attr('ry', 50)
		// 	.transition()
		// 	.attr('fill', 'green');
		// // .attr('fill', 'green')

		const width = 800;
		const height = 400;
		const svg = d3
			.select('#svgcontainer')
			.append('svg')
			.attr('id', 'inner-svg')
			.attr('width', width)
			.attr('height', height);

		const data = [10, 5, 12, 15];
		const w = 300;
		const scaleFactor = 20;
		const barHeight = 30;

		const bar = d3
			.select('svg#inner-svg')
			.selectAll('g')
			.data(data)
			.enter()
			.append('g')
			.attr('transform', (d, i) => {
				return 'translate(0,' + i * barHeight + ')';
			});

		bar
			.append('rect')
			.attr('width', (d: any) => {
				return d * scaleFactor;
			})
			.attr('height', barHeight - 1);

		bar
			.append('text')
			.attr('x', (d: any) => {
				return d * scaleFactor;
			})
			.attr('y', barHeight / 2)
			.attr('dy', '.35em')
			.text((d: any) => {
				return d;
			});

		this.pieChart();
	}

	public pieChart() {
		const svg = d3.select('svg#inner-svg');
		const width: any = svg.attr('width');
		const height: any = svg.attr('height');
		const radius: any = Math.min(parseInt(width, undefined), parseInt(height, undefined)) / 2;

		const g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
		// const g = svg.append('g');

		const color = d3.scaleOrdinal(['gray', 'green', 'brown', 'orange', 'yellow', 'red', 'purple']);

		const pie = d3.pie().value((d: any) => d.percent);

		const path: any = d3
			.arc()
			.outerRadius(radius - 10)
			.innerRadius(0);

		const label = d3
			.arc()
			.outerRadius(radius)
			.innerRadius(radius - 80);

		const data: any = [{ states: 'UP', percent: 80.0 }, { states: 'Maharastra', percent: 70.0 }];

		const arc = g
			.selectAll('.arc')
			.data(pie(data))
			.enter()
			.append('g')
			.attr('class', 'arc');

		arc
			.append('path')
			.attr('d', path)
			.attr('fill', (d: any) => {
				return color(d.data.states);
			});

		arc
			.append('text')
			.attr('transform', (d: any) => {
				return 'translate(' + label.centroid(d) + ')';
			})

			.text((d: any) => {
				return d.data.states;
			});
	}
}

export default ExampleD3;
