import * as React from 'react';
import Company from './../../models/Company';
import { Alert } from 'reactstrap';
import NumberFormatter from '../shared/NumberFormatter.component';
import DailySerieCardPriceChange from '../daily-serie/DailySerieCardPriceChange.component';
import { Observable } from 'rxjs';

interface ICompanyPageProps {
	company: Company | null;
	fetchCompany: () => Observable<boolean>;
}

interface ICompanyPageState {
	isError: boolean;
}

class CompanyPage extends React.Component<ICompanyPageProps, ICompanyPageState> {
	constructor(props: ICompanyPageProps) {
		super(props);
		this.state = {
			isError: true
		};
	}

	public render() {
		const instance: CompanyPage = this;
		return this.state.isError ? getError() : getContent();

		function getContent(): JSX.Element | undefined {
			const comp = instance.props.company;
			if (comp !== null) {
				return (
					<div>
						<div className="row text-center justify-content-center">
							<b>{comp.name}</b>
						</div>
						<div className="row text-center justify-content-center">
							<i>{comp.symbol}</i>
						</div>
						<div className="row text-left justify-content-left">
							<label>Sector: </label>
							{comp.sector}
						</div>
						<div className="row text-left justify-content-left">
							<label>Industry: </label>
							{comp.industry}
						</div>
						<div className="row text-left justify-content-left">
							<label>Market Capital: </label>
							<NumberFormatter value={comp.marketCap} />
						</div>
						<div className="row text-left justify-content-left">
							<label>Last Sale: </label>
							<NumberFormatter value={comp.lastSale} />
						</div>
					</div>
				);
			}
			return undefined;
		}

		function getError(): JSX.Element {
			return <Alert color="danger">Error retrieving the company</Alert>;
		}
	}

	public componentDidMount() {
		this.props.fetchCompany().subscribe((data: any) => {
			this.setState({ isError: !this.props.company || this.props.company === null });
		});
	}
}

export default CompanyPage;
