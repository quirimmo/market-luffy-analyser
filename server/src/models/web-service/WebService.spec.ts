import WebService from './WebService';

const instance: WebService = new WebService(5000);

describe('WebService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(WebService).toBeDefined();
  });

  it('should create an instance of the class', () => {
    expect(instance instanceof WebService).toBeTruthy();
  });

  it('should define the exposed methods', () => {
    expect(typeof instance.addRoute).toEqual('function');
    expect(typeof instance.listen).toEqual('function');
  });

  describe('constructor', () => {
    it('should define the attributes', () => {
      expect(instance.application).toBeDefined();
      expect(instance.port).toBeDefined();
      expect(instance.server).toBeDefined();
    });
  });

  describe('addRoute', () => {
    beforeEach(() => {
      spyOn(instance.application, 'use');
    });

    it('should call the use method of the application attributes', () => {
      const controller: any = {};
      instance.addRoute('', controller);
      expect(instance.application.use).toHaveBeenCalledWith('', controller);
    });

    it('should return the same istance as per builder pattern', () => {
      const controller: any = {};
      expect(instance.addRoute('', controller) instanceof WebService).toBeTruthy();
    });
  });

  describe('listen', () => {
    it('should call the listen method of a server', () => {
      spyOn(instance.server, 'listen');
      instance.listen().subscribe();
      expect(instance.server.listen).toHaveBeenCalled();
    });
  });
});
