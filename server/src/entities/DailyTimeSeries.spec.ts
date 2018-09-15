import DailyTimeSeries from './DailyTimeSeries';
import DailyTime from './DailyTime';

const input = [
  new DailyTime('2018-08-16', {
    '1. open': '60.00',
    '2. high': '70.00',
    '3. low': '80.00',
    '4. close': '100.00',
    '5. volume': '100.00'
  }),
  new DailyTime('2018-08-15', {
    '1. open': '10.00',
    '2. high': '20.00',
    '3. low': '30.00',
    '4. close': '40.00',
    '5. volume': '50.00'
  }),
  new DailyTime('2018-08-14', {
    '1. open': '10.00',
    '2. high': '20.00',
    '3. low': '30.00',
    '4. close': '-10.00',
    '5. volume': '50.00'
  }),
  new DailyTime('2018-08-13', {
    '1. open': '10.00',
    '2. high': '20.00',
    '3. low': '30.00',
    '4. close': '10.00',
    '5. volume': '50.00'
  })
];

const rawData = {
  '2018-08-16': {
    '1. open': '60.00',
    '2. high': '70.00',
    '3. low': '80.00',
    '4. close': '100.00',
    '5. volume': '100.00'
  },
  '2018-08-15': {
    '1. open': '10.00',
    '2. high': '20.00',
    '3. low': '30.00',
    '4. close': '40.00',
    '5. volume': '50.00'
  },
  '2018-08-14': {
    '1. open': '10.00',
    '2. high': '20.00',
    '3. low': '30.00',
    '4. close': '-10.00',
    '5. volume': '50.00'
  },
  '2018-08-13': {
    '1. open': '10.00',
    '2. high': '20.00',
    '3. low': '30.00',
    '4. close': '10.00',
    '5. volume': '50.00'
  }
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
    it('should return the DailyTimeSeries instance', () => {
      const built: DailyTimeSeries = DailyTimeSeries.buildFromData('FB', rawData);
      expect(built).toBeDefined();
      expect(built.dailyTimes.length).toEqual(4);
      expect(built.dailyTimes).toEqual(input);
    });

    it('should return the truncated DailyTimeSeries instance', () => {
      const built: DailyTimeSeries = DailyTimeSeries.buildFromData('FB', rawData);
      expect(built).toBeDefined();
      expect(built.dailyTimes.length).toEqual(2);
      expect(built.dailyTimes).toEqual([
        new DailyTime('2018-08-16', {
          '1. open': '60.00',
          '2. high': '70.00',
          '3. low': '80.00',
          '4. close': '100.00',
          '5. volume': '100.00'
        }),
        new DailyTime('2018-08-15', {
          '1. open': '10.00',
          '2. high': '20.00',
          '3. low': '30.00',
          '4. close': '40.00',
          '5. volume': '50.00'
        }),
        new DailyTime('2018-08-14', {
          '1. open': '10.00',
          '2. high': '20.00',
          '3. low': '30.00',
          '4. close': '-10.00',
          '5. volume': '50.00'
        }),
        new DailyTime('2018-08-13', {
          '1. open': '10.00',
          '2. high': '20.00',
          '3. low': '30.00',
          '4. close': '10.00',
          '5. volume': '50.00'
        })
      ]);
    });
  });
});
