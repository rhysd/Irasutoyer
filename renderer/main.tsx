import React = require('react');
import ReactDom = require('react-dom');
import {Provider} from 'react-redux';
import App from './components/app';
import Store from './store';

ReactDom.render(
    <Provider store={Store}>
        <App/>
    </Provider>,
    document.querySelector('.app')
);


