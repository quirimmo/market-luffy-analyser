import HTTPRequester from './HTTPRequester';

jest.mock('rxjs', () => {
  return {
    from: jest.fn(),
    forkJoin: jest.fn()
  };
});
import { from, forkJoin } from 'rxjs';

const instance = new HTTPRequester();

describe('HTTPRequester', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(HTTPRequester).toBeDefined();
  });

  it('should be an instance of the class', () => {
    expect(instance instanceof HTTPRequester).toBeTruthy();
  });

  it('should define the methods', () => {
    expect(typeof instance.get).toEqual('function');
    expect(typeof instance.getAll).toEqual('function');
  });

  describe('get', () => {
    let spy: any;
    beforeEach(() => {
      spy = spyOn(instance.axios, 'get').and.callFake(() => {});
    });

    it('should call the axios.get method with the right parameter', () => {
      instance.get('URL');
      expect(spy).toHaveBeenCalledWith('URL');
    });

    it('should call the from method of rxjs with the right parameter', () => {
      instance.get('URL');
      expect(from).toHaveBeenCalledTimes(1);
      expect(from).toHaveBeenCalledWith(instance.axios.get('URL'));
    });
  });

  describe('getAll', () => {
    const URLS = ['URL1', 'URL2'];
    let spy: any;
    beforeEach(() => {
      spy = spyOn(instance.axios, 'get').and.callFake(() => {});
    });

    it('should call the axios.get method with the right parameter for each url', () => {
      instance.getAll(URLS);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith('URL1');
      expect(spy).toHaveBeenCalledWith('URL2');
    });

    it('should call the from method of rxjs with the right parameter for each url', () => {
      instance.getAll(URLS);
      expect(from).toHaveBeenCalledTimes(2);
      expect(from).toHaveBeenCalledWith(instance.axios.get('URL1'));
      expect(from).toHaveBeenCalledWith(instance.axios.get('URL2'));
    });

    it('should call the forkJoin method of rxjs', () => {
      instance.getAll(URLS);
      expect(forkJoin).toHaveBeenCalled();
    });
  });
});
