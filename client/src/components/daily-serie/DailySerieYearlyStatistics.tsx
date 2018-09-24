import * as React from 'react';
import DailySerie from './../../models/DailySerie';
import DailyTime from './../../models/DailyTime';
import NumberFormatter from '../shared/NumberFormatter.component';
import PercentageFormatter from '../shared/PercentageFormatter';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import YearsDropdownSelector from '../shared/YearsDropdownSelector.component';
import MonthlyTrendByYear from '../shared/MonthlyTrendByYear.component';

interface IDailySerieYearlyStatisticsProps {
	dailySerie: DailySerie;
}

interface IDailySerieYearlyStatisticsState {
	years: Set<number>;
}

class DailySerieYearlyStatistics extends React.Component<IDailySerieYearlyStatisticsProps, IDailySerieYearlyStatisticsState> {
	private firstYear: number | undefined;
	private secondYear: number | undefined;

	constructor(props: IDailySerieYearlyStatisticsProps) {
		super(props);
		this.state = {
			years: new Set()
		};

		this.onSelectFirstYear = this.onSelectFirstYear.bind(this);
		this.onSelectSecondYear = this.onSelectSecondYear.bind(this);
	}

	public render() {
		return (
			<React.Fragment>
				<div className="col-6 justify-content-start text-left">
					<YearsDropdownSelector onSelectYear={this.onSelectFirstYear} years={Array.from(this.state.years)} />
				</div>
				<div className="col-6 justify-content-end text-right">
					<YearsDropdownSelector onSelectYear={this.onSelectSecondYear} years={Array.from(this.state.years)} />
				</div>
				<div className="mt-2 col-6 justify-content-start text-left">
					<MonthlyTrendByYear className="text-left" dailySerie={this.props.dailySerie} year={this.firstYear} />
				</div>
				<div className="mt-2 col-6 justify-content-end text-right">
					<MonthlyTrendByYear className="text-right" dailySerie={this.props.dailySerie} year={this.secondYear} />
				</div>
			</React.Fragment>
		);
	}

	public onSelectFirstYear(year: number | undefined) {
		this.firstYear = year;
		this.forceUpdate();
	}

	public onSelectSecondYear(year: number | undefined) {
		this.secondYear = year;
		this.forceUpdate();
	}

	public componentDidMount() {
		const years: Set<number> = new Set();
		this.props.dailySerie.dailyTimes.forEach((dailyTime: DailyTime) => {
			years.add(dailyTime.time.year());
		});
		this.setState((prevState: IDailySerieYearlyStatisticsState) => ({ ...prevState, years }));
	}
}

export default DailySerieYearlyStatistics;
