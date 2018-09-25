import * as moment from 'moment';

export default class DailyTime {
	public time: moment.Moment;

	constructor(
		time: string,
		public open: number,
		public high: number,
		public low: number,
		public close: number,
		public volume: number,
		public decimalsPrecision: number
	) {
		this.time = moment(time);
	}
}
