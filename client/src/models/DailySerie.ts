import DailyTime from './DailyTime';

class DailySerie {
	public weeklyTrend: number = 0;
	public monthlyTrend: number = 0;
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

	public getStartingDailyTime(): DailyTime {
		return this.dailyTimes[this.dailyTimes.length - 1] || new DailyTime('', 0, 0, 0, 0, 0, 0);
	}

	public getLastDailyTime(): DailyTime {
		return this.dailyTimes[0] || new DailyTime('', 0, 0, 0, 0, 0, 0);
	}

	public getLastHigherCloseDailyTime(): DailyTime {
		const lastClosePrice: number = this.getLastDailyTime().close;
		return this.dailyTimes.find((dailyTime: DailyTime) => lastClosePrice < dailyTime.close) || new DailyTime('', 0, 0, 0, 0, 0, 0);
	}

	public getLastLowerCloseDailyTime(): DailyTime {
		const lastClosePrice: number = this.getLastDailyTime().close;
		return this.dailyTimes.find((dailyTime: DailyTime) => lastClosePrice > dailyTime.close) || new DailyTime('', 0, 0, 0, 0, 0, 0);
	}

	public getHighestCloseDailyTime(): DailyTime {
		const closePrices = this.dailyTimes.map((dailyTime: DailyTime) => dailyTime.close);
		const highestClosePrice: number = Math.max(...closePrices);
		return this.dailyTimes.find((dailyTime: DailyTime) => dailyTime.close === highestClosePrice) || new DailyTime('', 0, 0, 0, 0, 0, 0);
	}

	public getLowestCloseDailyTime(): DailyTime {
		const closePrices = this.dailyTimes.map((dailyTime: DailyTime) => dailyTime.close);
		const highestClosePrice: number = Math.min(...closePrices);
		return this.dailyTimes.find((dailyTime: DailyTime) => dailyTime.close === highestClosePrice) || new DailyTime('', 0, 0, 0, 0, 0, 0);
	}

	public getMaxNumberOfNegativeDailyTimes(): number {
		return this.getNumberOfConsecutiveDailyTimes(false, true);
	}

	public getMaxNumberOfPositiveDailyTimes(): number {
		return this.getNumberOfConsecutiveDailyTimes(true, true);
	}

	public getMinNumberOfNegativeDailyTimes(): number {
		return this.getNumberOfConsecutiveDailyTimes(false, false);
	}

	public getMinNumberOfPositiveDailyTimes(): number {
		return this.getNumberOfConsecutiveDailyTimes(true, false);
	}

	public getNumberOfPositiveDailyTimes(): number {
		return this.priceChange.filter((priceChange: number) => priceChange > 0).length;
	}

	public getNumberOfNegativeDailyTimes(): number {
		return this.priceChange.filter((priceChange: number) => priceChange < 0).length;
	}

	private getNumberOfConsecutiveDailyTimes(isPositive: boolean, isMax: boolean): number {
		return isMax ? Math.max(...this.getConsecutiveDailyTimes(isPositive)) : Math.min(...this.getConsecutiveDailyTimes(isPositive));
	}

	private getConsecutiveDailyTimes(isPositive: boolean): number[] {
		const daysCounterArray: number[] = [];
		let daysCounter = 0;
		this.priceChange.forEach((priceChange: number, index: number, arr: number[]) => {
			const signCondition: boolean = isPositive ? Math.sign(priceChange) > 0 : Math.sign(priceChange) < 0;
			if (signCondition) {
				daysCounter++;
			} else {
				if (daysCounter > 0) {
					daysCounterArray.push(daysCounter);
					daysCounter = 0;
				}
			}
			if (isLastElement(index, arr) && daysCounter > 0) {
				daysCounterArray.push(daysCounter);
			}
		});

		return daysCounterArray;

		function isLastElement(index: number, arr: number[]): boolean {
			return index === arr.length - 1;
		}
	}
}

export default DailySerie;
