import * as React from 'react';
import * as d3 from 'd3';

export interface ID3PieChartData {
	label: string;
	value: number;
}

export interface ID3PieChartProps {
	data: ID3PieChartData[];
}

class D3PieChart extends React.Component<ID3PieChartProps, any> {
	constructor(props: ID3PieChartProps) {
		super(props);
	}

	public render() {
		return (
			<div className="svg-container">
				<svg className="svg-content-responsive" />
			</div>
		);
	}

	public componentDidMount() {
		const svg = d3
			.select('.svg-container svg')
			.attr('preserveAspectRatio', 'xMinYMin meet')
			.attr('viewBox', '0 0 600 400');

		const width: number = 200;
		const height: number = 200;
		const radius: any = Math.min(width, height) / 2;

		const g = svg.append('g').attr('transform', 'translate(200, 200)');
		const color = d3.scaleOrdinal(['gray', 'green', 'brown', 'orange', 'yellow', 'red', 'purple']);
		const pie = d3.pie().value((d: any) => d.value);

		const path: any = d3
			.arc()
			.outerRadius(radius)
			.innerRadius(0);

		const data: any = this.props.data;

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
				return color(d.data.label);
			});

		arc
			.append('polyline')
			.attr('points', (d: any) => {
				const startingPoint: any = [radius * 0.9 * Math.sin(midAngle(d)), radius * 0.9 * Math.cos(midAngle(d)) * -1];
				const point: any = [(radius + radius / 15) * Math.sin(midAngle(d)), (radius + radius / 15) * Math.cos(midAngle(d)) * -1];
				return `${startingPoint} ${point}`;
			})
			.style('stroke-width', '0.1px');

		arc
			.append('text')
			.attr('transform', (d: any) => {
				const point: any = [(radius + radius / 10) * Math.sin(midAngle(d)), (radius + radius / 10) * Math.cos(midAngle(d)) * -1];
				return 'translate(' + point + ')';
			})
			.attr('text-anchor', (d: any) => {
				return midAngle(d) > Math.PI ? 'end' : 'start';
			})
			.attr('alignment-baseline', 'hanging')
			.text((d: any) => {
				return d.data.label;
			});

		function midAngle(d: any) {
			return d.startAngle + (d.endAngle - d.startAngle) / 2;
		}
	}
}

export default D3PieChart;
