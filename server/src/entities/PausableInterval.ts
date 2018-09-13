import { Subject, Observable, interval, never, fromEvent } from 'rxjs';
import { switchMap, takeWhile, tap } from 'rxjs/operators';

class PausableInterval {
  public pauser: Subject<boolean>;
  public observable: Observable<any>;

  constructor(public period: number, public delay: number = 0, public socket: SocketIO.Socket) {
    this.pauser = new Subject<boolean>();
    const source: Subject<any> = new Subject<any>();
		interval(period + delay).subscribe(source);
    this.observable = this.pauser.pipe(takeWhile(() => socket.connected), switchMap((paused: boolean) => (paused ? never() : source)));
  }

  pause(): void {
    this.pauser.next(true);
  }

  resume(): void {
    this.pauser.next(false);
  }
}

export default PausableInterval;
