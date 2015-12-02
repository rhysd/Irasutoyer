import path = require('path');
import app = require('app');
import BrowserWindow = require('browser-window');
import ipc = require('ipc');
import setMenu from './menu';

const index_html = 'file://' + path.join(__dirname, '..', '..', 'index.html');

global.cache_path = path.join(app.getPath('userData'), 'irasutoya.json');
app.on('ready', () => {
    let win = new BrowserWindow({
        width: 800,
        height: 1000,
        'title-bar-style': process.platform === 'darwin' ? 'hidden-inset' : undefined,
        'use-content-size': true,
    });

    win.on('closed', () => {
        win = null;
        app.quit();
    });

    win.loadURL(index_html);

    win.webContents.openDevTools({detach: true});

    setMenu(win);
});

ipc.on('scraping:start', (event: any) => {
    const sender: GitHubElectron.WebContents = event.sender;
    console.log('Scraping start (dummy)', sender);

    // TODO: Temporary
    setTimeout(() => sender.send('scraping:end'), 5000);
})
