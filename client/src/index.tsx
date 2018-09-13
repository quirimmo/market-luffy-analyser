import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Action, Store } from 'redux';
import thunk from 'redux-thunk';
import history from './main-history';
import reducers from './reducers';
import AppPage from './components/app/App.container';

// to supply the missing of __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__() properties
// for not having a static type error
declare var window: any;

const store: Store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

const MainApp = ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<AppPage />
		</Router>
	</Provider>,
	document.getElementById('app') as HTMLElement
);

export default MainApp;
