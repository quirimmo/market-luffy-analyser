import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import history from './main-history';
import reducers from './reducers';
import AppPage from './components/containers/AppPage.component';

// to supply the missing of __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__() properties
// for not having a static type error
declare var window: any;
// const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store: any = compose(applyMiddleware(thunk))(
	createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
// createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const MainApp = ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<AppPage />
		</Router>
	</Provider>,
	document.getElementById('app') as HTMLElement
);

export default MainApp;

// connect to server
console.log('connecting to server');
import axios, { AxiosStatic, AxiosResponse } from 'axios';
axios.get('http://localhost:3000/companies/').then((data: any) => {
	console.log(data);
});

import * as io from 'socket.io-client';
const socket: SocketIOClient.Socket = io('http://localhost:3000');
socket.on('luffy-message', (data: any) => {
	console.log('Client: results received', data);
});
socket.on('connect', () => {
	console.log('Socket client connected with id: ', socket.id);
	socket.emit('luffy-message', {
		action: 'getAllData'
	});
});
