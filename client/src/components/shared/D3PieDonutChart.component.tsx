import * as React from 'react';
import * as d3 from 'd3';

import './d3-pie-donut-chart.scss';

export interface ID3PieDonutChartData {
	label: string;
	value: number;
	innerText?: string;
}

export interface ID3PieDonutChartProps {
	id: string;
	data: ID3PieDonutChartData[];
	outerRadius: number;
	innerRadius?: number; // default 0
	colors?: string[]; // defualt: 10 random colors of d3
	displayLabelLines?: boolean; // default: true
	onSliceClick?: (d: any, element: any) => void;
	onSliceEnter?: (d: any, element: any) => void;
	onSliceLeave?: (d: any, element: any) => void;
}

class D3PieDonutChart extends React.Component<ID3PieDonutChartProps, any> {
	constructor(props: ID3PieDonutChartProps) {
		super(props);
	}

	public render() {
		const viewportSize = this.props.outerRadius * 4;
		return (
			<svg id={this.props.id} viewBox={`0 0 ${viewportSize} ${viewportSize}`} preserveAspectRatio="xMinYMin meet" className="svg-pie-donut-chart">
				<g className="g-pie-donut-chart-container" />
			</svg>
		);
	}

	public componentDidMount() {
		// get the inner radius
		const innerRadius = this.props.innerRadius || 0;
		// get the colors to be used as random ones or custom ones
		const color: d3.ScaleOrdinal<string, string> =
			this.props.colors && this.props.colors.length ? d3.scaleOrdinal(this.props.colors) : d3.scaleOrdinal(d3.schemeCategory10);
		// get the given data
		const data: ID3PieDonutChartData[] = this.props.data;
		// get visibility of label lines
		const displayLabelLines = typeof this.props.displayLabelLines === 'boolean' ? this.props.displayLabelLines : true;
		// select the group main container from HTML
		const mainGroupContainer: d3.Selection<any, any, any, any> = d3.select(`#${this.props.id} g.g-pie-donut-chart-container`);
		// create the pie donut chart arc path specifying an inner radius and outer radius
		const pieDonutChartArcPath = this.createPieDonutChartArc(this.props.outerRadius, innerRadius);
		// draw the pie donut chart and add a g for each slice
		const pieDonutChart = this.displayPieDonutChart(mainGroupContainer, data);
		// draw the paths of the slices and fill them with the colors
		this.displaySlice(pieDonutChart, pieDonutChartArcPath, color);
		// if label lines enabled by props or by default
		if (displayLabelLines) {
			// display the polylines representing the label lines of the donut slice descriptions
			this.displayLabelLine(pieDonutChart, this.props.outerRadius);
		}
		// display the labels outside the slice arcs
		this.displayLabel(pieDonutChart, this.props.outerRadius);
		// if at least one label line has been provided
		if (data.some((el: ID3PieDonutChartData) => !!el.innerText)) {
			// display the inner text inside the slices
			this.displayInnerText(pieDonutChart, this.props.outerRadius, innerRadius);
		}
	}

	public createPieDonutChartArc(outerRadius: number, innerRadius: number): d3.Arc<any, any> {
		// create the donut chart using the given outer and inner radius
		return d3
			.arc()
			.outerRadius(outerRadius)
			.innerRadius(innerRadius);
	}

	public displayPieDonutChart(parent: d3.Selection<any, any, any, any>, data: any): d3.Selection<any, any, any, any> {
		// define the pie function specifying where to get the number values from (the d3 pie method set up a pie which uses value as numbers)
		const instance: D3PieDonutChart = this;
		const pie: d3.Pie<any, any> = d3.pie().value((d: any) => d.value);
		return parent
			.selectAll('.arc')
			.data(pie(data))
			.enter()
			.append('g')
			.on('click', function(d: any) {
				instance.onSliceClick(d, this);
			})
			.on('mouseenter', function(d: any) {
				instance.onSliceEnter(d, this);
			})
			.on('mouseleave', function(d: any) {
				instance.onSliceLeave(d, this);
			})
			.classed('donut-chart', true);
	}

	public displaySlice(pieDonutChart: d3.Selection<any, any, any, any>, arcPath: d3.Arc<any, any>, color: d3.ScaleOrdinal<string, string>): void {
		// display the slice picking a color from the given list
		pieDonutChart
			.append('path')
			.attr('d', arcPath)
			.attr('fill', (d: any) => color(d.data.label))
			.classed('pie-donut-chart-slice', true);
	}

	public displayLabelLine(pieDonutChart: d3.Selection<any, any, any, any>, outerRadius: number): void {
		// display the line connecting the slice to the outer label, starting it at outerRadius * 0.9 and ending it at outerRadius/15 far from the circle
		pieDonutChart
			.append('polyline')
			.attr('points', (d: any) => this.getPolylinePointsOnCircle(d, outerRadius * 0.9, outerRadius + outerRadius / 15))
			.classed('pie-donut-chart-label-line', true);
	}

	public getPolylinePointsOnCircle(d: any, startRadius: number, endRadius: number): string {
		// given a start and end radius, return the string coordinates of the start and end point corresponding to these radius
		const startPoint = this.getPointOnCircle(d, startRadius);
		const endPoint = this.getPointOnCircle(d, endRadius);
		return this.getPolylinePoints(startPoint, endPoint);
	}

	public getPointOnCircle(d: any, radius: number): [number, number] {
		// get a point on the circle through the x and y coordinates
		// x = radius * sin(middle angle of arc)
		// y = radius * cos(middle angle of arc)
		return [radius * Math.sin(this.getMiddleAngle(d)), radius * Math.cos(this.getMiddleAngle(d)) * -1];
	}

	public getMiddleAngle(d: any): number {
		// retrieve the mid angle of a slice as the start angle of the slice + half of the arc's angle of the slice
		return d.startAngle + (d.endAngle - d.startAngle) / 2;
	}

	public getPolylinePoints(startPoint: [number, number], endPoint: [number, number]): string {
		// return a string coordinates of a start and end point as the format 'x1,y1 x2,y2'
		return `${startPoint} ${endPoint}`;
	}

	public displayLabel(pieDonutChart: d3.Selection<any, any, any, any>, outerRadius: number): void {
		// display the outer label of a slice positioning it radius/10 far away from the circle
		pieDonutChart
			.append('text')
			.attr('transform', (d: any) => this.getTranslation(d, outerRadius + outerRadius / 10))
			.attr('text-anchor', (d: any) => (this.getMiddleAngle(d) > Math.PI ? 'end' : 'start'))
			.attr('alignment-baseline', 'hanging')
			.text((d: any) => d.data.label)
			.classed('pie-donut-chart-label', true);
	}

	public getTranslation(d: any, radius: number): string {
		// get the translation on the circle for the transform attribute
		const point = this.getPointOnCircle(d, radius);
		return `translate(${point})`;
	}

	public displayInnerText(pieDonutChart: d3.Selection<any, any, any, any>, outerRadius: number, innerRadius: number): void {
		const radius = innerRadius === 0 ? outerRadius / 2 : innerRadius + (outerRadius - innerRadius) / 2;
		// display the inner text of a slice positioning the text in the middle of the arc
		pieDonutChart
			.append('text')
			.attr('transform', (d: any) => this.getTranslation(d, radius))
			.attr('alignment-baseline', 'center')
			.text((d: any) => d.data.innerText)
			.classed('pie-donut-chart-inner-text', true);
	}

	public onSliceClick(d: any, element: any): void {
		if (this.props.onSliceClick && typeof this.props.onSliceClick === 'function') {
			this.props.onSliceClick(d, element);
		}
	}

	public onSliceEnter(d: any, element: any): void {
		if (this.props.onSliceEnter && typeof this.props.onSliceEnter === 'function') {
			this.props.onSliceEnter(d, element);
		}
	}

	public onSliceLeave(d: any, element: any): void {
		if (this.props.onSliceLeave && typeof this.props.onSliceLeave === 'function') {
			this.props.onSliceLeave(d, element);
		}
	}
}

export default D3PieDonutChart;
