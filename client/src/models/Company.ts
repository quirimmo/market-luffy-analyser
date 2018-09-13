class Company {
	public isVisible: boolean;

	constructor(
		public symbol: string,
		public name: string,
		public lastSale: number,
		public marketCap: number,
		public sector: string,
		public industry: string
	) {
		this.isVisible = true;
	}
}

export default Company;
