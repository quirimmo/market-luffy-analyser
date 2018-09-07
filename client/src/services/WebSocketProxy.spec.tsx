import WebSocketProxy from "./WebSocketProxy";

const instance: WebSocketProxy = new WebSocketProxy();

describe('WebSocketProxy', () => {
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
	});
});