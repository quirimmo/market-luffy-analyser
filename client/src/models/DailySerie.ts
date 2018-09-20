import DailyTime from './DailyTime';

class DailySerie {
	public weeklyTrend: number = 0;
	public montlyTrend: number = 0;
	public quarterTrend: number = 0;
	public semesterTrend: number = 0;
	public yearlyTrend: number = 0;

	constructor(
		public symbol: string,
		public lastMovement: number,
		public priceChange: number[],
		public trend: number,
		public dailyTimes: DailyTime[] = []
	) {}

	public buildDailyTimes(prices: any): void {
		this.dailyTimes = [].concat(
			prices.map((price: any) => new DailyTime(price.time, price.open, price.high, price.low, price.close, price.volume, price.decimalsPrecision))
		);
	}

	public calculateTrend(period: number): number {
		if (period < 0) {
			throw new Error('You cannot calculate a trend over a negative period');
		}
		const slicedPriceChange = this.priceChange.slice(0, period);
		return slicedPriceChange.reduce((acc: number, val: number) => acc + val, 0);
	}

	public setupTrendInfo(): void {
		this.weeklyTrend = this.calculateTrend(7);
		this.montlyTrend = this.calculateTrend(30);
		this.quarterTrend = this.calculateTrend(90);
		this.semesterTrend = this.calculateTrend(180);
		this.yearlyTrend = this.calculateTrend(365);
	}
}

export default DailySerie;
