import React = require('react');
import ReactDom = require('react-dom');
import {Provider} from 'react-redux';
import App from './components/app';
import {endScraping} from './actions';
import Store from './store';

const ipc: ElectronRenderer.InProcess = global.require('ipc');

ReactDom.render(
    <Provider store={Store}>
        <App/>
    </Provider>,
    document.querySelector('.app')
);

ipc.on('scraping:end', () => {
    console.log('Sraping end.');
    Store.dispatch(endScraping());
});
