import * as io from 'socket.io-client';
import { SERVER_URL } from './../constants/constants';
import { fromEvent, Observable, Observer, Subject } from 'rxjs';

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
		fromEvent(WebSocketProxy.socket, 'connect').subscribe(() => {
			console.log('Socket client connected with id: ', WebSocketProxy.socket.id);
		});
		fromEvent(WebSocketProxy.socket, 'disconnect').subscribe(() => {
			console.log('Socket client disconnected with id: ', WebSocketProxy.socket.id);
		});
		fromEvent(WebSocketProxy.socket, 'message').subscribe((data: any) => {
			console.log('Client: message received', data);
			// WebSocketProxy.streamObservable.next(data);
		});
		fromEvent(WebSocketProxy.socket, 'luffy-message').subscribe((data: any) => {
			console.log('Client: results received', data);
			WebSocketProxy.streamObservable.next(data);
		});
		return fromEvent(WebSocketProxy.socket, 'connect');
	}

	public static sendMessage(keyword: string, data: any) {
		WebSocketProxy.socket.emit(keyword, data);
	}

	public static requestAllData() {
		WebSocketProxy.socket.emit('luffy-message', { action: 'getAllData' });
	}
}

export default WebSocketProxy;
