import * as React from 'react';
import * as d3 from 'd3';

export interface ID3PieChartData {
	label: string;
	value: number;
	innerText?: string;
}

export interface ID3PieChartProps {
	data: ID3PieChartData[];
	id: string;
	colors?: string[]; // defualt: 10 random colors of d3
	displayLabelLines?: boolean; // default: true
}

class D3PieChart extends React.Component<ID3PieChartProps, any> {
	constructor(props: ID3PieChartProps) {
		super(props);
	}

	public render() {
		return (
			<svg id={this.props.id} viewBox="0 0 600 600" preserveAspectRatio="xMinYMin meet" className="svg-pie-chart">
				<g className="g-pie-chart-container" />
			</svg>
		);
	}

	public componentDidMount() {
		// get the colors to be used as random ones or custom ones
		const color: d3.ScaleOrdinal<string, string> =
			this.props.colors && this.props.colors.length ? d3.scaleOrdinal(this.props.colors) : d3.scaleOrdinal(d3.schemeCategory10);
		// get the given data
		const data: ID3PieChartData[] = this.props.data;
		// get visibility of label lines
		const displayLabelLines = typeof this.props.displayLabelLines === 'boolean' ? this.props.displayLabelLines : true;
		// define the radius of the pie chart
		const radius: number = 200;
		// select the group main container from HTML
		const mainGroupContainer: d3.Selection<any, any, any, any> = d3.select('g.g-pie-chart-container');
		// create the pie chart Arc path specifying an inner radius(which is 0 for circles and !== 0 for donuts ) and outer radius
		const pieChartArcPath = this.createPieChartArc(radius);
		// draw the pie chart and add a g for each slice
		const arc = this.displayPieChart(mainGroupContainer, data);
		// draw the paths of the slices and fill them with the colors
		this.displaySlice(arc, pieChartArcPath, color);
		// if label lines enabled by props or by default
		if (displayLabelLines) {
			// display the polylines representing the label lines of the pie slice descriptions
			this.displayLabelLine(arc, radius);
		}
		// display the labels outside the slice arcs
		this.displayLabel(arc, radius);
		// if at least one label line has been provided
		if (data.some((el: ID3PieChartData) => !!el.innerText)) {
			// display the inner text inside the slices
			this.displayInnerText(arc, radius);
		}
	}

	public getMiddleAngle(d: any): number {
		return d.startAngle + (d.endAngle - d.startAngle) / 2;
	}

	public getPointOnCircle(d: any, radius: number): [number, number] {
		return [radius * Math.sin(this.getMiddleAngle(d)), radius * Math.cos(this.getMiddleAngle(d)) * -1];
	}

	public getTranslation(d: any, radius: number): string {
		const point = this.getPointOnCircle(d, radius);
		return `translate(${point})`;
	}

	public getPolylinePoints(startPoint: [number, number], endPoint: [number, number]): string {
		return `${startPoint} ${endPoint}`;
	}

	public getPolylinePointsOnCircle(d: any, startRadius: number, endRadius: number): string {
		const startPoint = this.getPointOnCircle(d, startRadius);
		const endPoint = this.getPointOnCircle(d, endRadius);
		return this.getPolylinePoints(startPoint, endPoint);
	}

	public displayInnerText(arc: d3.Selection<any, any, any, any>, radius: number): void {
		arc
			.append('text')
			.attr('transform', (d: any) => this.getTranslation(d, radius / 2))
			.attr('alignment-baseline', 'center')
			.text((d: any) => d.data.innerText)
			.classed('pie-chart-inner-text', true);
	}

	public displayLabel(arc: d3.Selection<any, any, any, any>, radius: number): void {
		arc
			.append('text')
			.attr('transform', (d: any) => this.getTranslation(d, radius + radius / 10))
			.attr('text-anchor', (d: any) => (this.getMiddleAngle(d) > Math.PI ? 'end' : 'start'))
			.attr('alignment-baseline', 'hanging')
			.text((d: any) => d.data.label)
			.classed('pie-chart-label', true);
	}

	public displayLabelLine(arc: d3.Selection<any, any, any, any>, radius: number): void {
		arc
			.append('polyline')
			.attr('points', (d: any) => this.getPolylinePointsOnCircle(d, radius * 0.9, radius + radius / 15))
			.classed('pie-chart-label-line', true);
	}

	public displaySlice(arc: d3.Selection<any, any, any, any>, arcPath: d3.Arc<any, any>, color: d3.ScaleOrdinal<string, string>): void {
		arc
			.append('path')
			.attr('d', arcPath)
			.attr('fill', (d: any) => color(d.data.label))
			.classed('pie-chart-slice', true);
	}

	public displayPieChart(parent: d3.Selection<any, any, any, any>, data: any): d3.Selection<any, any, any, any> {
		// define the pie function specifying where to get the number values from (the d3 pie method set up a pie which uses value as numbers)
		const pie: d3.Pie<any, any> = d3.pie().value((d: any) => d.value);
		return parent
			.selectAll('.arc')
			.data(pie(data))
			.enter()
			.append('g')
			.classed('pie-chart', true);
	}

	public createPieChartArc(radius: number): d3.Arc<any, any> {
		return d3
			.arc()
			.outerRadius(radius)
			.innerRadius(0);
	}
}

export default D3PieChart;
