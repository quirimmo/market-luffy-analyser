import ApplicationServerSocket from './ApplicationServerSocket';
import { createServer, Server } from 'http';

const instance: ApplicationServerSocket = new ApplicationServerSocket();

describe('ApplicationServerSocket', () => {
  beforeEach(() => {
    jest.mock('socket.io', () =>
      jest.fn().mockImplementation(() => {
        console.log('mock is calling');
        return 'ciao';
      })
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(ApplicationServerSocket).toBeDefined();
  });

  it('should instantiate an object', () => {
    expect(instance instanceof ApplicationServerSocket).toBeTruthy();
  });

  it('should define the public methods', () => {
    expect(typeof instance.createSocketFromServer).toEqual('function');
    expect(typeof instance.onConnect).toEqual('function');
    expect(typeof instance.onClientDisconnect).toEqual('function');
    expect(typeof instance.send).toEqual('function');
    expect(typeof instance.broadcast).toEqual('function');
  });

  describe('createSocketFromServer', () => {
    it('should call the socket.io default method with the right paramters', () => {
      const spy = spyOn(instance, 'defaultMethod');
      const server: Server = createServer();
      instance.createSocketFromServer(server);
      expect(spy).toHaveBeenCalledWith(server);
    });

    it('should init the socket attribute', () => {
      const emptyInstance = new ApplicationServerSocket();
      expect(emptyInstance.socket).toBeUndefined();
      emptyInstance.createSocketFromServer(createServer());
      expect(emptyInstance.socket).toBeDefined();
    });
  });

  describe('onConnect', () => {
    it('should trow an the error', () => {
      const emptyInstance = new ApplicationServerSocket();
      expect(emptyInstance.onConnect.bind(emptyInstance)).toThrow('Server Socket is undefined');
    });

    it('should call the method on of the socket attribute', () => {
      instance.socket = instance.createSocketFromServer(createServer());
      const spy = jest.fn();
      instance.socket.on = spy;
      instance.onConnect().subscribe();
      expect(spy).toHaveBeenCalledWith('connect', expect.any(Function));
    });
  });

  describe('onDisconnect', () => {
    const socket: any = {
      on: jest.fn()
    };

    it('should call the method on of the socket input', () => {
      instance.onClientDisconnect(socket);
      expect(socket.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
    });
  });

  describe('send', () => {
    it('should call the method emit on the socket instance with the right params', () => {
      const socketInstance: any = {
        emit: jest.fn()
      };
      instance.send(socketInstance, 'keyword', 'data');
      expect(socketInstance.emit).toHaveBeenCalledWith('keyword', 'data');
    });
  });

  describe('broadcast', () => {
    it('should call the method emit on the socket instance with the right params', () => {
      const socketInstance: any = {
        broadcast: {
          emit: jest.fn()
        }
      };
      instance.broadcast(socketInstance, 'keyword', 'data');
      expect(socketInstance.broadcast.emit).toHaveBeenCalledWith('keyword', 'data');
    });
  });
});
