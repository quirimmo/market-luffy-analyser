import PausableInterval from './PausableInterval';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';

const socketInstance: any = { connected: false };
const instance: PausableInterval = new PausableInterval(1000, 500, socketInstance);

describe('PausableInterval', () => {
  it('should be defined', () => {
    expect(PausableInterval).toBeDefined();
  });

  it('should create an instance of the class', () => {
    expect(instance instanceof PausableInterval).toBeTruthy();
  });

  it('should define the exposed methods', () => {
    expect(typeof instance.pause).toEqual('function');
    expect(typeof instance.resume).toEqual('function');
  });

  describe('constructor', () => {
    it('should init the attributes', () => {
      expect(instance.pauser).toBeDefined();
      expect(instance.observable).toBeDefined();
    });

    it('should call the interval method with the right parameters', () => {
      spyOn(rxjs, 'interval').and.callThrough();
      new PausableInterval(1000, 500, socketInstance);
      expect(rxjs.interval).toHaveBeenCalledWith(1500);
    });

    it('should call the switchMap method on the source attribute', () => {
      spyOn(rxjsOperators, 'switchMap').and.callThrough();
      new PausableInterval(1000, 500, socketInstance);
      expect(rxjsOperators.switchMap).toHaveBeenCalled();
    });
  });

  describe('pause', () => {
    it('should call the next method of the pauser with true', () => {
      spyOn(instance.pauser, 'next');
      instance.pause();
      expect(instance.pauser.next).toHaveBeenCalledWith(true);
    });
  });

  describe('resume', () => {
    it('should call the next method of the pauser with false', () => {
      spyOn(instance.pauser, 'next');
      instance.resume();
      expect(instance.pauser.next).toHaveBeenCalledWith(false);
    });
  });
});
