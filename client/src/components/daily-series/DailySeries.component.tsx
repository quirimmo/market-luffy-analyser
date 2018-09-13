import * as React from 'react';
import DailySerie from './../../models/DailySerie';
import DailySerieCard from '../daily-serie/DailySerieCard.component';

export interface IDailySeriesProps {
	dailySeries: DailySerie[];
}

class DailySeries extends React.Component<IDailySeriesProps, any> {
	constructor(props: IDailySeriesProps) {
		super(props);
	}

	public render() {
		return (
			<div className="row text-center justify-content-center">
				{this.props.dailySeries.map((dailySerie: DailySerie, index: number) => {
					return (
						<div className="col-lg-3 col-md-4 col-sm-6" key={index}>
							<DailySerieCard dailySerie={dailySerie} />
						</div>
					);
				})}
			</div>
		);
	}
}

export default DailySeries;
