import * as React from 'react';
import './loading-gears.scss';

interface ILoadingGearsProps {
	width?: string;
	height?: string;
	imgClasses?: string;
}

class LoadingGears extends React.Component<ILoadingGearsProps, any> {
	constructor(props: ILoadingGearsProps) {
		super(props);
	}

	public render() {
		const attributes: any = {};
		if (this.props.width) {
			attributes.width = this.props.width;
		}
		if (this.props.height) {
			attributes.height = this.props.height;
		}
		if (this.props.imgClasses) {
			attributes.className = this.props.imgClasses;
		}
		return (
			<div className="loading-component container-fluid justify-content-center text-center">
				<img {...attributes} src="images/gear-animation-orange.gif" />
			</div>
		);
	}
}

export default LoadingGears;
