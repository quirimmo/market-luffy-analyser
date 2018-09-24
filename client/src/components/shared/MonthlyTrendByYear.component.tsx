import * as React from 'react';
import DailySerie from './../../models/DailySerie';
import PercentageFormatter from './PercentageFormatter';

interface IMonthlyTrendByYearProps {
	year: number | undefined;
	dailySerie: DailySerie;
	className?: string;
}

class MonthlyTrendByYear extends React.Component<IMonthlyTrendByYearProps, any> {
	private months: string[] = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	constructor(props: IMonthlyTrendByYearProps) {
		super(props);
	}

	public render() {
		const instance: MonthlyTrendByYear = this;

		return <React.Fragment>{getContent()}</React.Fragment>;

		function getContent(): JSX.Element | undefined {
			if (instance.props.year) {
				const year: number = instance.props.year;
				return (
					<React.Fragment>
						{instance.months.map((month: string, index: number) => (
							<div key={`${instance.props.year}-${index}`} className={`row ${instance.props.className}`}>
								<div className="col-sm-8 col-12">{month}</div>
								<div className="col-sm-4 col-12">
									<PercentageFormatter value={instance.getYearMonthValue(year, index)} />
								</div>
							</div>
						))}
					</React.Fragment>
				);
			}
			return undefined;
		}
	}

	public getYearMonthValue(year: number, month: number) {
		return this.props.dailySerie.getYearMonthTrend(year, month);
	}
}

export default MonthlyTrendByYear;
