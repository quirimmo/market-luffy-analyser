import * as React from 'react';
import * as d3 from 'd3';

const data: any[] = [
	{
		year: 2006,
		population: 40
	},
	{
		year: 2008,
		population: 45
	},
	{
		year: 2010,
		population: 48
	},
	{
		year: 2012,
		population: 51
	}
];

class D3GraphChart extends React.Component {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<svg viewBox={`0 0 600 400`} preserveAspectRatio="xMinYMin meet" className="svg-graph-chart">
				<g />
			</svg>
		);
	}

	public componentDidMount() {
		const margin = { top: 20, right: 20, bottom: 30, left: 50 };
		const width = 960 - margin.left - margin.right;
		const height = 500 - margin.top - margin.bottom;

		const x = d3.scaleTime().range([0, width]);
		const y = d3.scaleLinear().range([height, 0]);

		const valueline = d3
			.line()
			.x((d: any) => {
				return x(d.year);
			})
			.y((d: any) => {
				return y(d.population);
			});

		const g = d3.select('.svg-graph-chart g');

		data.forEach((d: any) => {
			d.year = d.year;
			d.population = +d.population;
		});

		const minAndMax: any = d3.extent(data.map((d: any) => d.year));
		const xDomain = x.domain(minAndMax);
		const yDomain = y.domain([
			0,
			d3.max(data, (d: any) => {
				return d.population;
			})
		]);

		// Add the valueline path.
		g.append('path')
			.data([data])
			.attr('class', 'line')
			.attr('d', valueline);

		g.append('g').call(d3.axisBottom.call(this, xDomain));

		g.append('g').call(d3.axisLeft.call(this, yDomain));

		const xscale = d3
			.scaleLinear()
			.domain([0, 10])
			.range([0, width - 100]);

		const yscale = d3
			.scaleLinear()
			.domain([0, 10])
			.range([height / 2, 0]);

		const xAxis = d3.axisBottom(xscale);

		g.append('g').call(d3.axisBottom.call(this, xscale));

		// const xAxis = d3.axisBottom(xDomain).scale(x);
		// g.append('g').call(xAxis);
		// g.append(d3.axisLeft(d3.scaleLinear(x)));
		// g.append('g').call(d3.axisBottom(x.domain()));
		// g.append('g').attr('transform', 'translate(0,' + height + ')');
		// .call(d3.axisBottom(x));

		// g.append('g').call(d3.axisLeft(y));
	}
}

export default D3GraphChart;
