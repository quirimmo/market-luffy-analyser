class Utils {
	public static getBearishBullishClass(value: number): string {
		return Math.sign(value) > 0 ? 'bullish-value' : Math.sign(value) < 0 ? 'bearish-value' : '';
	}

	private constructor() {}
}

export default Utils;
