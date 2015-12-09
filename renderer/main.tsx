import React = require('react');
import ReactDom = require('react-dom');
import injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import {Provider} from 'react-redux';
import App from './components/app';
import {endScraping, failedScraping} from './actions';
import Store from './store';

const ipcRenderer = global.require('electron').ipcRenderer;

ReactDom.render(
    <Provider store={Store}>
        <App/>
    </Provider>,
    document.querySelector('.app')
);

ipcRenderer.on('scraping:end', () => {
    Store.dispatch(endScraping());
});

ipcRenderer.on('scraping:error', (e: Error) => {
    Store.dispatch(failedScraping(e));
});

