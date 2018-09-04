import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Action, Store } from 'redux';
import thunk from 'redux-thunk';
import history from './main-history';
import reducers from './reducers';
import AppPage from './components/app/App.container';
import { createEpicMiddleware, combineEpics, Epic, EpicMiddleware } from 'redux-observable';
import { fetchCompaniesEpic } from './actions/companies.action';

// to supply the missing of __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__() properties
// for not having a static type error
declare var window: any;

const rootEpic: Epic<Action<any>> = combineEpics(fetchCompaniesEpic);
const epicMiddleware: EpicMiddleware<Action<any>> = createEpicMiddleware();
const store: Store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk, epicMiddleware)
);
epicMiddleware.run(rootEpic);

const MainApp = ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<AppPage />
		</Router>
	</Provider>,
	document.getElementById('app') as HTMLElement
);

export default MainApp;

// connect to socket
// import * as io from 'socket.io-client';
// import { fromEvent } from 'rxjs';
// const socket: SocketIOClient.Socket = io('http://localhost:3000');

// fromEvent(socket, 'connect').subscribe(() => {
// 	console.log('Socket client connected with id: ', socket.id);
// 	socket.emit('luffy-message', {
// 		action: 'getAllData'
// 	});
// });
// fromEvent(socket, 'luffy-message').subscribe((data: any) => {
// 	console.log('Client: results received', data);
// });
// fromEvent(socket, 'message').subscribe((data: any) => {
// 	console.log('Client: message received', data);
// });





// socket.on('luffy-message', (data: any) => {
// 	console.log('Client: results received', data);
// });

// socket.on('connect', () => {
// 	console.log('Socket client connected with id: ', socket.id);
// 	socket.emit('luffy-message', {
// 		action: 'getAllData'
// 	});
// });

// import { WebSocketSubject } from 'rxjs/webSocket';

// const socket$ = new WebSocketSubject('ws://localhost:3000');
// socket$.subscribe(data => console.log(data), err => console.error(err), () => console.warn('Completed!'));
// socket$.next({
// 	event: 'events',
// 	data: 'test'
// });
