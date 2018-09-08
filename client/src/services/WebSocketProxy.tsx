import * as io from 'socket.io-client';
import { SERVER_URL } from './../constants/constants';
import { fromEvent, Observable, Subject, of } from 'rxjs';
import DailySerie from './../models/DailySerie';

class WebSocketProxy {
	public static socket: SocketIOClient.Socket;
	public static streamObservable: Subject<any>;

	public static getSocket(): SocketIOClient.Socket {
		return WebSocketProxy.socket;
	}

	public static getStreamObservable(): Subject<any> {
		return WebSocketProxy.streamObservable;
	}

	public static connect(): Observable<any> {
		WebSocketProxy.streamObservable = new Subject<any>();
		WebSocketProxy.socket = io(SERVER_URL);
		WebSocketProxy.subscribeToSocketEvents();
		return fromEvent(WebSocketProxy.getSocket(), 'connect');
	}

	public static subscribeToSocketEvents() {
		fromEvent(WebSocketProxy.getSocket(), 'connect').subscribe(WebSocketProxy.onConnectSubscribe);
		fromEvent(WebSocketProxy.getSocket(), 'disconnect').subscribe(WebSocketProxy.onDisconnectSubscribe);
		fromEvent(WebSocketProxy.getSocket(), 'message').subscribe(WebSocketProxy.onGeneralMessageSubscribe);
		fromEvent(WebSocketProxy.getSocket(), 'luffy-message').subscribe(WebSocketProxy.onLuffyMessageSubscribe);
	}

	public static onConnectSubscribe(): void {
		console.log('Socket client connected with id: ', WebSocketProxy.getSocket().id);
	}

	public static onDisconnectSubscribe(): void {
		console.log('Socket client disconnected with id: ', WebSocketProxy.getSocket().id);
	}

	public static onGeneralMessageSubscribe(message: any): void {
		console.log('Client: message received', message);
	}

	public static onLuffyMessageSubscribe(message: any): void {
		console.log('Client: luffy message received', message);
		const rawData: any = message.data;
		const dailySerie: DailySerie = new DailySerie(rawData.symbol, rawData.lastMovement, rawData.priceChange, rawData.trend);
		WebSocketProxy.getStreamObservable().next({ dailySerie, finished: message.finished });

		// if (message.finished === true) {
		// 	WebSocketProxy.getStreamObservable().next({ finished: true });
		// } else {
		// 	const rawData: any = message.data;
		// 	const dailySerie: DailySerie = new DailySerie(rawData.symbol, rawData.lastMovement, rawData.priceChange, rawData.trend);
		// 	WebSocketProxy.getStreamObservable().next(dailySerie);
		// }
	}

	public static disconnect(): Observable<any> {
		return of(WebSocketProxy.getSocket().disconnect());
	}

	public static sendMessage(keyword: string, data: any) {
		WebSocketProxy.getSocket().emit(keyword, data);
	}

	public static requestAllData(size?: number) {
		WebSocketProxy.getSocket().emit('luffy-message', { action: 'getAllData', size });
	}
}

export default WebSocketProxy;
