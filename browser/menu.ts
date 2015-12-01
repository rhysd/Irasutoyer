import * as Menu from 'menu';
import {openExternal} from 'shell';

export default function setMenu(win: GitHubElectron.BrowserWindow) {
    const template = [
        {
            label: 'Irasutoyer',

            submenu: [
                {
                    label: 'Restart',
                    accelerator: 'Command+R',
                    click: () => win.reload()
                },
                {
                    label: 'DevTools',
                    click: () => win.webContents.toggleDevTools()
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: () => win.close()
                },
                {
                    type: 'separator'
                },
                {
                    label: 'About',
                    click: () => openExternal('https://github.com/rhysd/Irasutoyer')
                },
                {
                    label: 'いらすとや',
                    click: () => openExternal('http://www.irasutoya.com/')
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    return menu;
}
