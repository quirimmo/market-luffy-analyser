import * as io from 'socket.io-client';
import { SERVER_URL } from './../constants/constants';
import { fromEvent, Observable, Observer, Subject, of } from 'rxjs';
import DailySerie from './../models/DailySerie';

class WebSocketProxy {
	public static socket: SocketIOClient.Socket;
	public static streamObservable: Subject<any>;

	public static getSocket(): SocketIOClient.Socket {
		return WebSocketProxy.socket;
	}

	public static getStreamObservable(): Observable<any> {
		return WebSocketProxy.streamObservable;
	}

	public static connect(): Observable<any> {
		WebSocketProxy.streamObservable = new Subject<any>();
		WebSocketProxy.socket = io(SERVER_URL);
		fromEvent(WebSocketProxy.socket, 'connect').subscribe(WebSocketProxy.onConnectSubscribe);
		fromEvent(WebSocketProxy.socket, 'disconnect').subscribe(WebSocketProxy.onDisconnectSubscribe);
		fromEvent(WebSocketProxy.socket, 'message').subscribe(WebSocketProxy.onGeneralMessageSubscribe);
		fromEvent(WebSocketProxy.socket, 'luffy-message').subscribe(WebSocketProxy.onLuffyMessageSubscribe);

		return fromEvent(WebSocketProxy.socket, 'connect');
	}

	public static onConnectSubscribe(): void {
		console.log('Socket client connected with id: ', WebSocketProxy.socket.id);
	}

	public static onDisconnectSubscribe(): void {
		console.log('Socket client disconnected with id: ', WebSocketProxy.socket.id);
	}

	public static onGeneralMessageSubscribe(message: any): void {
		console.log('Client: message received', message);
	}

	public static onLuffyMessageSubscribe(message: any): void {
		console.log('Client: luffy message received', message);
		const rawData: any = message.data;
		const dailySerie: DailySerie = new DailySerie(rawData.symbol, rawData.lastMovement, rawData.priceChange, rawData.trend);
		WebSocketProxy.streamObservable.next(dailySerie);
	}

	public static disconnect(): Observable<any> {
		return of(WebSocketProxy.socket.disconnect());
	}

	public static sendMessage(keyword: string, data: any) {
		WebSocketProxy.socket.emit(keyword, data);
	}

	public static requestAllData() {
		WebSocketProxy.socket.emit('luffy-message', { action: 'getAllData' });
	}
}

export default WebSocketProxy;
