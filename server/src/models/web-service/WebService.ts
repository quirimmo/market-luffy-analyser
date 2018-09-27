import express, { Application, Router } from 'express';
import { createServer, Server } from 'http';
import { Observable, of, Observer } from 'rxjs';

class WebService {
  public application: Application;
  public server: Server;

  constructor(public port: number) {
    this.port = port;
    this.application = express();
    this.server = createServer(this.application);
  }

  addRoute(route: string, controller: Router): WebService {
    this.application.use(route, controller);
    return this;
  }

  listen(): Observable<boolean> {
    const instance: any = this;
    return new Observable<boolean>(onSubscribe);

    function onSubscribe(observer: Observer<boolean>) {
      instance.server.listen(instance.port, onSuccess);

      function onSuccess(error: any) {
        if (error) {
					observer.error(`Error running on port ${instance.port}`);
					observer.complete();
        }
        console.log(`Web Service running on port ${instance.port}`);
        observer.next(true);
        observer.complete();
      }
    }
  }
}

export default WebService;
