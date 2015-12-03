import React = require('react');
import ReactDom = require('react-dom');
import injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
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
    Store.dispatch(endScraping());
});

ipc.on('scraping:error', (e: Error) => {
    Store.dispatch(failedScraping(e));
});

