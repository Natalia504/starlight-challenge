import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './components/reducer';
import { BrowserRouter, Route } from 'react-router-dom';


ReactDOM.render(
    <Provider store={createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(promiseMiddleware())
    )}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>

    </Provider>, document.getElementById('root'));
registerServiceWorker();
