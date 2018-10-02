import * as React from 'react';

import './example-d3.scss';
import D3GraphChart from './D3GraphChart.component';

class ExampleD3 extends React.Component {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<div>
				<D3GraphChart />
			</div>
		);
	}
}

export default ExampleD3;
