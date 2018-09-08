const mockSocketIO = jest.fn();
jest.mock('socket.io-client', () => mockSocketIO);

import WebSocketProxy from './WebSocketProxy';
import * as rxjs from 'rxjs';
import DailySerie from './../models/DailySerie';
import { SERVER_URL } from './../constants/constants';

const instance: WebSocketProxy = new WebSocketProxy();

describe('WebSocketProxy', () => {
	const luffyMessage = {
		finished: false,
		data: {
			symbol: 'Symbol',
			lastMovement: 0,
			priceChange: [1, 2],
			trend: 3
		}
	};
	const mockEmit = jest.fn();
	const mockDisconnect = jest.fn();
	beforeEach(() => {
		spyOn(WebSocketProxy, 'getSocket').and.returnValue({ emit: mockEmit, id: 'socket', disconnect: mockDisconnect });
		spyOn(WebSocketProxy, 'getStreamObservable').and.returnValue(new rxjs.Subject<any>());
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(WebSocketProxy).toBeDefined();
	});

	it('should create an instance of the class', () => {
		expect(instance instanceof WebSocketProxy).toBeTruthy();
	});

	it('should define the exposed methods', () => {
		expect(typeof WebSocketProxy.connect).toEqual('function');
		expect(typeof WebSocketProxy.disconnect).toEqual('function');
		expect(typeof WebSocketProxy.getSocket).toEqual('function');
		expect(typeof WebSocketProxy.getStreamObservable).toEqual('function');
		expect(typeof WebSocketProxy.onConnectSubscribe).toEqual('function');
		expect(typeof WebSocketProxy.onDisconnectSubscribe).toEqual('function');
		expect(typeof WebSocketProxy.onGeneralMessageSubscribe).toEqual('function');
		expect(typeof WebSocketProxy.onLuffyMessageSubscribe).toEqual('function');
		expect(typeof WebSocketProxy.requestAllData).toEqual('function');
		expect(typeof WebSocketProxy.sendMessage).toEqual('function');
		expect(typeof WebSocketProxy.subscribeToSocketEvents).toEqual('function');
	});

	describe('requestAllData', () => {
		it('should emit the message with the right parameters', () => {
			WebSocketProxy.requestAllData(5);
			expect(mockEmit).toHaveBeenCalledWith('luffy-message', { action: 'getAllData', size: 5 });
		});
	});

	describe('sendMessage', () => {
		it('should emit the message with the right parameters', () => {
			WebSocketProxy.sendMessage('keyword', 'data');
			expect(mockEmit).toHaveBeenCalledWith('keyword', 'data');
		});
	});

	describe('disconnect', () => {
		it('should call the disconnect method of the socket', () => {
			WebSocketProxy.disconnect();
			expect(mockDisconnect).toHaveBeenCalled();
		});
	});

	describe('onLuffyMessageSubscribe', () => {
		it('should log the received message', () => {
			spyOn(console, 'log');
			WebSocketProxy.onLuffyMessageSubscribe(luffyMessage);
			expect(console.log).toHaveBeenCalledWith('Client: luffy message received', luffyMessage);
		});

		it('should emit a message of the streamObservable', () => {
			const spy = spyOn(WebSocketProxy.getStreamObservable(), 'next');
			WebSocketProxy.onLuffyMessageSubscribe(luffyMessage);
			const dailySerie: DailySerie = new DailySerie('Symbol', 0, [1, 2], 3);
			expect(spy).toHaveBeenCalledWith({ dailySerie, finished: false });
		});
	});

	describe('onGeneralMessageSubscribe', () => {
		it('should log the received message', () => {
			spyOn(console, 'log');
			WebSocketProxy.onGeneralMessageSubscribe('message');
			expect(console.log).toHaveBeenCalledWith('Client: message received', 'message');
		});
	});

	describe('onDisconnectSubscribe', () => {
		it('should log the disconnected socket', () => {
			spyOn(console, 'log');
			WebSocketProxy.onDisconnectSubscribe();
			expect(console.log).toHaveBeenCalledWith('Socket client disconnected with id: ', 'socket');
		});
	});

	describe('onConnectSubscribe', () => {
		it('should log the connected socket', () => {
			spyOn(console, 'log');
			WebSocketProxy.onConnectSubscribe();
			expect(console.log).toHaveBeenCalledWith('Socket client connected with id: ', 'socket');
		});
	});

	describe('connect', () => {
		it('should instantiate the client socket', () => {
			WebSocketProxy.connect();
			expect(mockSocketIO).toHaveBeenCalledWith(SERVER_URL);
		});

		it('should call the subscribeToSocketEvents method', () => {
			const spy = spyOn(WebSocketProxy, 'subscribeToSocketEvents');
			WebSocketProxy.connect();
			expect(spy).toHaveBeenCalled();
		});

		it('should return an observable of the connection event', () => {
			expect(WebSocketProxy.connect() instanceof rxjs.Observable).toBeTruthy();
		});
	});

	describe('subscribeToSocketEvents', () => {
		let mockFromEvent: any;
		let mockFromEventSubscription: any;
		beforeEach(() => {
			mockFromEvent = spyOn(rxjs, 'fromEvent').and.returnValue(new rxjs.Observable());
			mockFromEventSubscription = spyOn(mockFromEvent(), 'subscribe');
		});

		it('should subscribe to the socket connect event', () => {
			WebSocketProxy.subscribeToSocketEvents();
			expect(mockFromEvent).toHaveBeenCalledWith(WebSocketProxy.getSocket(), 'connect');
			expect(mockFromEventSubscription).toHaveBeenCalledWith(WebSocketProxy.onConnectSubscribe);
		});

		it('should subscribe to the socket disconnect event', () => {
			WebSocketProxy.subscribeToSocketEvents();
			expect(mockFromEvent).toHaveBeenCalledWith(WebSocketProxy.getSocket(), 'disconnect');
			expect(mockFromEventSubscription).toHaveBeenCalledWith(WebSocketProxy.onDisconnectSubscribe);
		});

		it('should subscribe to the socket message event', () => {
			WebSocketProxy.subscribeToSocketEvents();
			expect(mockFromEvent).toHaveBeenCalledWith(WebSocketProxy.getSocket(), 'message');
			expect(mockFromEventSubscription).toHaveBeenCalledWith(WebSocketProxy.onGeneralMessageSubscribe);
		});

		it('should subscribe to the socket luffy message event', () => {
			WebSocketProxy.subscribeToSocketEvents();
			expect(mockFromEvent).toHaveBeenCalledWith(WebSocketProxy.getSocket(), 'luffy-message');
			expect(mockFromEventSubscription).toHaveBeenCalledWith(WebSocketProxy.onLuffyMessageSubscribe);
		});
	});
});
