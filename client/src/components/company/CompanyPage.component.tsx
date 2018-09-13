import * as React from 'react';
import { withRouter } from 'react-router-dom';

class CompanyPage extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		console.log(this.props);
	}

	public render() {
		console.log('rendering company page');
		return <div>COMPANY PAGE</div>;
	}
}

export default withRouter(CompanyPage);
