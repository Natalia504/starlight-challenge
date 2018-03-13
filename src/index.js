import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './components/reducer';


ReactDOM.render(
    <Provider store={createStore(reducer, applyMiddleware(promiseMiddleware))}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
