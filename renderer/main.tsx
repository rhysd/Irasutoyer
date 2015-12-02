import React = require('react');
import ReactDom = require('react-dom');
import {Provider} from 'react-redux';
import App from './components/app';
import {endScraping, failedScraping} from './actions';
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

ipc.on('scraping:error', (_: Event, e: Error) => {
    console.log('Sraping error.', e);
    Store.dispatch(failedScraping(e));
});
