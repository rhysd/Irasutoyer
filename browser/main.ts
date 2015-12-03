import path = require('path');
import fs = require('fs');
import app = require('app');
import BrowserWindow = require('browser-window');
import ipc = require('ipc');
import he = require('he');
import setMenu from './menu';
import {fetchAllIrasuto, Irasutoya, Irasuto} from 'node-irasutoya';

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

    setMenu();
});

function scrape() {
    return fetchAllIrasuto().then((map: Irasutoya) =>
        JSON.stringify(
            Array.from(map.values()).reduce(
                (acc: Irasuto[], irasuto: Irasuto[]) => {
                    for (const i of irasuto) {
                        i.name = he.decode(i.name);
                        acc.push(i);
                    }
                    return acc;
                },
                [] as Irasuto[]
            )
        )
    );
}

ipc.on('scraping:start', (event: any) => {
    const sender: GitHubElectron.WebContents = event.sender;
    scrape().then((json: string) => {
            fs.writeFileSync(global.cache_path, json, 'utf8');
            sender.send('scraping:end');
        }).catch(e => {
            sender.send('scraping:error', e);
        });
})
