import { Server } from 'http';
import { Observable, Observer } from 'rxjs';
import * as socketIo from 'socket.io';

class ApplicationServerSocket {
  public defaultMethod: Function;
  public server: Server | undefined;
  public socket: socketIo.Server | undefined;

  constructor() {
    // hack for testing
    this.defaultMethod = socketIo.default;
  }

  createSocketFromServer(server: Server): socketIo.Server {
    this.server = server;
    this.socket = <socketIo.Server> this.defaultMethod(this.server);
    return this.socket;
  }

  onConnect(onDisconnect?: Function): Observable<socketIo.Socket> {
    if (typeof this.socket === 'undefined') {
      throw new Error('Server Socket is undefined');
    }
    const instance: any = this;
    return new Observable(onSubscribe);

    function onSubscribe(observer: Observer<socketIo.Socket>) {
      instance.socket.on('connect', onSocketConnected);

      function onSocketConnected(socketInstance: socketIo.Socket) {
        console.log('Client Socket connected with an id', socketInstance.id);
        instance.onClientDisconnect(socketInstance, onDisconnect);
        observer.next(socketInstance);
        observer.complete();
      }
    }
  }

  onClientDisconnect(socketInstance: socketIo.Socket, onDisconnect: Function | undefined = undefined): void {
    socketInstance.on('disconnect', onSocketDisconnected);

    function onSocketDisconnected() {
      console.log('Client Socket disconnected with an id', socketInstance.id);
      if (onDisconnect) {
        onDisconnect(socketInstance);
      }
    }
  }

  send(socketInstance: socketIo.Socket, keyword: string, data: any) {
    socketInstance.emit(keyword, data);
  }

  broadcast(socketInstance: socketIo.Socket, keyword: string, data: any) {
    socketInstance.broadcast.emit(keyword, data);
  }
}

export default ApplicationServerSocket;
