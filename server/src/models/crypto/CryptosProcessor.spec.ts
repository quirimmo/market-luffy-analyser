import CryptosProcessor from './CryptosProcessor';

jest.mock('fs', () => {
  return {
    readFileSync: jest.fn(() => {
      return '[{"symbol": "CPT1", "name": "Crypto1"}, {"symbol": "CPT2", "name": "Crypto2"}]';
    })
  };
});

const instance: CryptosProcessor = new CryptosProcessor();

describe('CryptosProcessor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(CryptosProcessor).toBeDefined();
  });

  it('should crete an instance', () => {
    expect(instance instanceof CryptosProcessor).toBeTruthy();
  });

  it('should expose the static methods', () => {
    expect(typeof CryptosProcessor.getAllCryptos).toEqual('function');
  });

  describe('getAllCryptos', () => {
    it('should return the list of cryptos from the raw cryptos', () => {
      expect(CryptosProcessor.getAllCryptos()).toEqual([
        {
          symbol: 'CPT1',
          name: 'Crypto1'
        },
        {
          symbol: 'CPT2',
          name: 'Crypto2'
        }
      ]);
    });
  });
});
