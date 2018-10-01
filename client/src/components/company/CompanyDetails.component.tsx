import * as React from 'react';
import Company from './../../models/Company';
import DailySerie from './../../models/DailySerie';
import DailySerieCardPriceChange from '../daily-serie/DailySerieCardPriceChange.component';
import NumberFormatter from '../shared/NumberFormatter.component';
import Utils from './../../utils/Utils';
import DailySerieDetails from '../daily-serie/DailySerieDetails.component';
import D3PieChart, { ID3PieChartData } from '../shared/D3PieChart.component';
import D3DonutChart from '../shared/D3DonutChart.component';

interface ICompanyDetailsProps {
	company: Company;
}

class CompanyDetails extends React.Component<ICompanyDetailsProps, any> {
	public constructor(props: ICompanyDetailsProps) {
		super(props);
	}

	public render() {
		const dailySerie: DailySerie = this.props.company.dailySerie ? this.props.company.dailySerie : new DailySerie('0', 0, [0], 0);
		const pieChartTotalNumbersData = this.getPieChartTotalNumbersData(dailySerie);
		const pieChartTotalNumbersColors = ['red', 'green'];
		const pieChartTotalNumbersRadius = 100;
		return (
			<div>
				{/* large screens */}
				<table className="company-details-table-container table d-none d-md-table">
					<thead>
						<tr>
							<th scope="col">Sector</th>
							<th scope="col">Industry</th>
							<th scope="col">Capital</th>
							<th scope="col">Sale</th>
							<th scope="col">Movement</th>
							<th scope="col">Trend</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td scope="row">{this.props.company.sector}</td>
							<td scope="row">{this.props.company.industry}</td>
							<td scope="row" className={`${Utils.getBearishBullishClass(this.props.company.marketCap)}`}>
								<NumberFormatter value={this.props.company.marketCap} suffix="$" />
							</td>
							<td scope="row" className={`${Utils.getBearishBullishClass(this.props.company.lastSale)}`}>
								<NumberFormatter value={this.props.company.lastSale} suffix="$" />
							</td>
							<td scope="row" className={`${Utils.getBearishBullishClass(dailySerie.lastMovement)}`}>
								<NumberFormatter value={dailySerie.lastMovement} suffix="%" />
							</td>
							<td scope="row" className={`${Utils.getBearishBullishClass(dailySerie.trend)}`}>
								<NumberFormatter value={dailySerie.trend} suffix="%" />
							</td>
						</tr>
					</tbody>
				</table>
				{/* small screens */}
				<div className="company-details-div-container row d-block d-md-none">
					<div className="row col-xl-3 text-left">
						<label className="col-4 font-weight-bold text-left">Sector</label>
						<span className="col-8 font-italic text-left">{this.props.company.sector}</span>
					</div>
					<div className="row col-xl-3 text-left">
						<label className="col-4 font-weight-bold text-left">Industry</label>
						<span className="col-8 font-italic text-left">{this.props.company.industry}</span>
					</div>
					<div className="row col-xl-3 text-left">
						<label className="col-4 font-weight-bold text-left">Capital</label>
						<span className={`col-8 font-italic text-left ${Utils.getBearishBullishClass(this.props.company.marketCap)}`}>
							<NumberFormatter value={this.props.company.marketCap} suffix="$" />
						</span>
					</div>
					<div className="row col-xl-3 text-left">
						<label className="col-4 font-weight-bold text-left">Sale</label>
						<span className={`col-8 font-italic text-left ${Utils.getBearishBullishClass(this.props.company.lastSale)}`}>
							<NumberFormatter value={this.props.company.lastSale} suffix="$" />
						</span>
					</div>
					<div className="row col-xl-3 text-left">
						<label className="col-4 font-weight-bold text-left">Movement</label>
						<span className={`col-8 font-italic text-left ${Utils.getBearishBullishClass(dailySerie.lastMovement)}`}>
							<NumberFormatter value={dailySerie.lastMovement} suffix="%" />
						</span>
					</div>
					<div className="row col-xl-3 text-left">
						<label className="col-4 font-weight-bold text-left">Trend</label>
						<span className={`col-8 font-italic text-left ${Utils.getBearishBullishClass(dailySerie.trend)}`}>
							<NumberFormatter value={dailySerie.trend} suffix="%" />
						</span>
					</div>
				</div>
				<br />
				<DailySerieDetails dailySerie={dailySerie} />
				<br />
				<div className="row">
					<div className="col-md-6 col-sm-12">
						<D3PieChart
							colors={pieChartTotalNumbersColors}
							radius={pieChartTotalNumbersRadius}
							id="pie-chart-total-numbers"
							data={pieChartTotalNumbersData}
						/>
					</div>
					<div className="col-md-6 col-sm-12">
						<D3DonutChart
							colors={pieChartTotalNumbersColors}
							outerRadius={100}
							innerRadius={50}
							id="donut-chart-total-numbers"
							data={pieChartTotalNumbersData}
						/>
					</div>
				</div>
				<br />
				<DailySerieCardPriceChange priceClasses="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-3 text-center" priceChange={dailySerie.priceChange} />
			</div>
		);
	}

	public getPieChartTotalNumbersData(dailySerie: DailySerie): ID3PieChartData[] {
		const negativeDays = dailySerie.getNumberOfNegativeDailyTimes();
		const positiveDays = dailySerie.getNumberOfPositiveDailyTimes();
		const allDays = negativeDays + positiveDays;
		const negativeDaysPercentage = Math.round(100 / (allDays / negativeDays));
		const positiveDaysPercentage = Math.round(100 / (allDays / positiveDays));
		console.log('negative days percentage', negativeDaysPercentage);
		console.log('positive days percentage', positiveDaysPercentage);
		return [
			{
				label: `Negatives: ${negativeDays}`,
				value: negativeDaysPercentage,
				innerText: `${negativeDaysPercentage}%`
			},
			{
				label: `Positives: ${positiveDays}`,
				value: positiveDaysPercentage,
				innerText: `${positiveDaysPercentage}%`
			}
		];
	}
}

export default CompanyDetails;
