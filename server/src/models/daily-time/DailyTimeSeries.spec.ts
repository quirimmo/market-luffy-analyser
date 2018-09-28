import DailyTimeSeries from './DailyTimeSeries';
import DailyTime from './DailyTime';
import CryptoDailyTime from './CryptoDailyTime';

const firstInputDailyTime = {
  '1. open': '60.00',
  '2. high': '70.00',
  '3. low': '80.00',
  '4. close': '100.00',
  '5. volume': '100.00'
};
const secondInputDailyTime = {
  '1. open': '10.00',
  '2. high': '20.00',
  '3. low': '30.00',
  '4. close': '40.00',
  '5. volume': '50.00'
};
const thirdInputDailyTime = {
  '1. open': '10.00',
  '2. high': '20.00',
  '3. low': '30.00',
  '4. close': '-10.00',
  '5. volume': '50.00'
};
const fourthInputDailyTime = {
  '1. open': '10.00',
  '2. high': '20.00',
  '3. low': '30.00',
  '4. close': '10.00',
  '5. volume': '50.00'
};

const input = [
  new DailyTime('2018-08-16', firstInputDailyTime),
  new DailyTime('2018-08-15', secondInputDailyTime),
  new DailyTime('2018-08-14', thirdInputDailyTime),
  new DailyTime('2018-08-13', fourthInputDailyTime)
];

const rawData = {
  '2018-08-16': firstInputDailyTime,
  '2018-08-15': secondInputDailyTime,
  '2018-08-14': thirdInputDailyTime,
  '2018-08-13': fourthInputDailyTime
};

const firstInputCryptoDailyTime = {
  '1a. open (USD)': '60.00',
  '2a. high (USD)': '70.00',
  '3a. low (USD)': '80.00',
  '4a. close (USD)': '100.00',
  '5. volume': '100.00',
  '6. market cap (USD)': '200.00'
};
const secondInputCryptoDailyTime = {
  '1a. open (USD)': '10.00',
  '2a. high (USD)': '20.00',
  '3a. low (USD)': '30.00',
  '4a. close (USD)': '40.00',
  '5. volume': '50.00',
  '6. market cap (USD)': '300.00'
};
const thirdInputCryptoDailyTime = {
  '1a. open (USD)': '10.00',
  '2a. high (USD)': '20.00',
  '3a. low (USD)': '30.00',
  '4a. close (USD)': '-10.00',
  '5. volume': '50.00',
  '6. market cap (USD)': '400.00'
};
const fourthInputCryptoDailyTime = {
  '1a. open (USD)': '10.00',
  '2a. high (USD)': '20.00',
  '3a. low (USD)': '30.00',
  '4a. close (USD)': '-10.00',
  '5. volume': '50.00',
  '6. market cap (USD)': '400.00'
};

const cryptoInput = [
  new CryptoDailyTime('2018-08-16', firstInputCryptoDailyTime),
  new CryptoDailyTime('2018-08-15', secondInputCryptoDailyTime),
  new CryptoDailyTime('2018-08-14', thirdInputCryptoDailyTime),
  new CryptoDailyTime('2018-08-13', fourthInputCryptoDailyTime)
];

const rawCryptoData = {
  '2018-08-16': firstInputCryptoDailyTime,
  '2018-08-15': secondInputCryptoDailyTime,
  '2018-08-14': thirdInputCryptoDailyTime,
  '2018-08-13': fourthInputCryptoDailyTime
};

const instance = new DailyTimeSeries('FB', input);

describe('DailyTimeSeries', () => {
  it('should be defined', () => {
    expect(DailyTimeSeries).toBeDefined();
  });

  it('should be an instance of the class', () => {
    expect(instance instanceof DailyTimeSeries).toBeTruthy();
  });

  it('should define the exposed methods', () => {
    expect(typeof instance.getLastMovement).toEqual('function');
    expect(typeof instance.getPriceChangeByPeriod).toEqual('function');
    expect(typeof instance.getTrendByPeriod).toEqual('function');
    expect(typeof DailyTimeSeries.buildFromData).toEqual('function');
  });

  describe('getLastMovement', () => {
    it('should return the percentage last movement', () => {
      expect(instance.getLastMovement()).toEqual(650);
    });

    it('should return the absolute last movement', () => {
      expect(instance.getLastMovement(false)).toEqual(110);
    });
  });

  describe('getPriceChangeByPeriod', () => {
    it('should return the percentage price change serie', () => {
      expect(instance.getPriceChangeByPeriod()).toEqual([150, 500, -200]);
    });

    it('should return the percentage price change serie of the first two close prices', () => {
      expect(instance.getPriceChangeByPeriod(true, 2)).toEqual([150]);
    });

    it('should return the absolute price change serie', () => {
      expect(instance.getPriceChangeByPeriod(false)).toEqual([60, 50, -20]);
    });
  });

  describe('getTrendByPeriod', () => {
    it('should return the percentage total trend', () => {
      expect(instance.getTrendByPeriod()).toEqual(450);
    });

    it('should return the percentage trend of the first two close prices', () => {
      expect(instance.getTrendByPeriod(true, 2)).toEqual(150);
    });

    it('should return the absolute total trend', () => {
      expect(instance.getTrendByPeriod(false)).toEqual(90);
    });
  });

  describe('buildFromData', () => {
    it('should return the DailyTimeSeries instance with DailyTimes', () => {
      const built: DailyTimeSeries = DailyTimeSeries.buildFromData('FB', rawData);
      expect(built).toBeDefined();
      expect(built.dailyTimes.length).toEqual(4);
      expect(built.dailyTimes).toEqual(input);
    });

    it('should return an empty DailyTimeSerie instance', () => {
      const built: DailyTimeSeries = DailyTimeSeries.buildFromData('FB', undefined);
      expect(built.dailyTimes).toEqual([]);
    });

    it('should return the DailyTimeSeries instance with DailyTimes', () => {
      const built: DailyTimeSeries = DailyTimeSeries.buildFromData('FB', rawCryptoData, true);
      expect(built).toBeDefined();
      expect(built.dailyTimes.length).toEqual(4);
      expect(built.dailyTimes).toEqual(cryptoInput);
    });
  });
});
