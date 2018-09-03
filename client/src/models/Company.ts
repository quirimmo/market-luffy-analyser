class Company {
	constructor(
		public symbol: string,
		public name: string,
		public lastSale: number,
		public marketCap: number,
		public sector: string,
		public industry: string
	) {}
}

export default Company;
