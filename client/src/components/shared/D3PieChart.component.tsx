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
	onPieChartClick?: (d: any, element: any) => void;
	onPieChartEnter?: (d: any, element: any) => void;
	onPieChartLeave?: (d: any, element: any) => void;
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
		const pieChart = this.displayPieChart(mainGroupContainer, data);
		// draw the paths of the slices and fill them with the colors
		this.displaySlice(pieChart, pieChartArcPath, color);
		// if label lines enabled by props or by default
		if (displayLabelLines) {
			// display the polylines representing the label lines of the pie slice descriptions
			this.displayLabelLine(pieChart, radius);
		}
		// display the labels outside the slice arcs
		this.displayLabel(pieChart, radius);
		// if at least one label line has been provided
		if (data.some((el: ID3PieChartData) => !!el.innerText)) {
			// display the inner text inside the slices
			this.displayInnerText(pieChart, radius);
		}
	}

	public getMiddleAngle(d: any): number {
		// retrieve the mid angle of a slice as the start angle of the slice + half of the arc's angle of the slice
		return d.startAngle + (d.endAngle - d.startAngle) / 2;
	}

	public getPointOnCircle(d: any, radius: number): [number, number] {
		// get a point on the circle through the x and y coordinates
		// x = radius * sin(middle angle of arc)
		// y = radius * cos(middle angle of arc)
		return [radius * Math.sin(this.getMiddleAngle(d)), radius * Math.cos(this.getMiddleAngle(d)) * -1];
	}

	public getTranslation(d: any, radius: number): string {
		// get the translation on the circle for the transform attribute
		const point = this.getPointOnCircle(d, radius);
		return `translate(${point})`;
	}

	public getPolylinePoints(startPoint: [number, number], endPoint: [number, number]): string {
		// return a string coordinates of a start and end point as the format 'x1,y1 x2,y2'
		return `${startPoint} ${endPoint}`;
	}

	public getPolylinePointsOnCircle(d: any, startRadius: number, endRadius: number): string {
		// given a start and end radius, return the string coordinates of the start and end point corresponding to these radius
		const startPoint = this.getPointOnCircle(d, startRadius);
		const endPoint = this.getPointOnCircle(d, endRadius);
		return this.getPolylinePoints(startPoint, endPoint);
	}

	public displayInnerText(pieChart: d3.Selection<any, any, any, any>, radius: number): void {
		// display the inner text of a slice positioning the text in the middle of the arc
		pieChart
			.append('text')
			.attr('transform', (d: any) => this.getTranslation(d, radius / 2))
			.attr('alignment-baseline', 'center')
			.text((d: any) => d.data.innerText)
			.classed('pie-chart-inner-text', true);
	}

	public displayLabel(pieChart: d3.Selection<any, any, any, any>, radius: number): void {
		// display the outer label of a slice positioning it radius/10 far away from the circle
		pieChart
			.append('text')
			.attr('transform', (d: any) => this.getTranslation(d, radius + radius / 10))
			.attr('text-anchor', (d: any) => (this.getMiddleAngle(d) > Math.PI ? 'end' : 'start'))
			.attr('alignment-baseline', 'hanging')
			.text((d: any) => d.data.label)
			.classed('pie-chart-label', true);
	}

	public displayLabelLine(pieChart: d3.Selection<any, any, any, any>, radius: number): void {
		// display the line connecting the slice to the outer label, starting it at radius * 0.9 and ending it at radius/15 far from the circle
		pieChart
			.append('polyline')
			.attr('points', (d: any) => this.getPolylinePointsOnCircle(d, radius * 0.9, radius + radius / 15))
			.classed('pie-chart-label-line', true);
	}

	public displaySlice(pieChart: d3.Selection<any, any, any, any>, arcPath: d3.Arc<any, any>, color: d3.ScaleOrdinal<string, string>): void {
		// display the slice picking a color from the given list
		pieChart
			.append('path')
			.attr('d', arcPath)
			.attr('fill', (d: any) => color(d.data.label))
			.classed('pie-chart-slice', true);
	}

	public displayPieChart(parent: d3.Selection<any, any, any, any>, data: any): d3.Selection<any, any, any, any> {
		// define the pie function specifying where to get the number values from (the d3 pie method set up a pie which uses value as numbers)
		const instance: D3PieChart = this;
		const pie: d3.Pie<any, any> = d3.pie().value((d: any) => d.value);
		return parent
			.selectAll('.arc')
			.data(pie(data))
			.enter()
			.append('g')
			.on('click', function(d: any) {
				instance.onPieChartClick(d, this);
			})
			.on('mouseenter', function(d: any) {
				instance.onPieChartEnter(d, this);
			})
			.on('mouseleave', function(d: any) {
				instance.onPieChartLeave(d, this);
			})
			.classed('pie-chart', true);
	}

	public createPieChartArc(radius: number): d3.Arc<any, any> {
		// create the pie chart using the given radius as outer radius and inner radius as 0 for a circle, otherwise it would be a donut
		return d3
			.arc()
			.outerRadius(radius)
			.innerRadius(0);
	}

	public onPieChartClick(d: any, element: any): void {
		if (this.props.onPieChartClick && typeof this.props.onPieChartClick === 'function') {
			this.props.onPieChartClick(d, element);
		}
	}

	public onPieChartEnter(d: any, element: any): void {
		if (this.props.onPieChartEnter && typeof this.props.onPieChartEnter === 'function') {
			this.props.onPieChartEnter(d, element);
		}
	}

	public onPieChartLeave(d: any, element: any): void {
		if (this.props.onPieChartLeave && typeof this.props.onPieChartLeave === 'function') {
			this.props.onPieChartLeave(d, element);
		}
	}
}

export default D3PieChart;
