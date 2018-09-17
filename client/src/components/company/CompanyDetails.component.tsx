import * as React from 'react';
import Company from './../../models/Company';
import DailySerie from './../../models/DailySerie';
import DailySerieCardPriceChange from '../daily-serie/DailySerieCardPriceChange.component';
import NumberFormatter from '../shared/NumberFormatter.component';
import Utils from './../../utils/Utils';

interface ICompanyDetailsProps {
	company: Company;
}

class CompanyDetails extends React.Component<ICompanyDetailsProps, any> {
	public constructor(props: ICompanyDetailsProps) {
		super(props);
	}

	public render() {
		const dailySerie: DailySerie = this.props.company.dailySerie ? this.props.company.dailySerie : new DailySerie('0', 0, [0], 0);
		return (
			<div>
				{/* large screens */}
				<table className="table d-none d-md-table">
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
								<NumberFormatter value={this.props.company.marketCap} />
							</td>
							<td scope="row" className={`${Utils.getBearishBullishClass(this.props.company.lastSale)}`}>
								<NumberFormatter value={this.props.company.lastSale} />
							</td>
							<td scope="row" className={`${Utils.getBearishBullishClass(dailySerie.lastMovement)}`}>
								{dailySerie.lastMovement}
							</td>
							<td scope="row" className={`${Utils.getBearishBullishClass(dailySerie.trend)}`}>
								{dailySerie.trend}
							</td>
						</tr>
					</tbody>
				</table>
				{/* small screens */}
				<div className="row d-block d-md-none">
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
							<NumberFormatter value={this.props.company.marketCap} />
						</span>
					</div>
					<div className="row col-xl-3 text-left">
						<label className="col-4 font-weight-bold text-left">Sale</label>
						<span className={`col-8 font-italic text-left ${Utils.getBearishBullishClass(this.props.company.lastSale)}`}>
							<NumberFormatter value={this.props.company.lastSale} />
						</span>
					</div>
					<div className="row col-xl-3 text-left">
						<label className="col-4 font-weight-bold text-left">Movement</label>
						<span className={`col-8 font-italic text-left ${Utils.getBearishBullishClass(dailySerie.lastMovement)}`}>{dailySerie.lastMovement}</span>
					</div>
					<div className="row col-xl-3 text-left">
						<label className="col-4 font-weight-bold text-left">Trend</label>
						<span className={`col-8 font-italic text-left ${Utils.getBearishBullishClass(dailySerie.trend)}`}>{dailySerie.trend}</span>
					</div>
				</div>
				{/* daily serie prices change */}
				<DailySerieCardPriceChange priceClasses="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-3 text-center" priceChange={dailySerie.priceChange} />
			</div>
		);
	}
}

export default CompanyDetails;
