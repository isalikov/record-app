const { app, BrowserWindow, globalShortcut } = require('electron');

let win;
let willQuitApp;

function createWindow () {
    win = new BrowserWindow({
        width: 680,
        height: 464,
        fullscreenable: false,
        movable: true,
        titleBarStyle: 'customButtonsOnHover',
        frame: false,
        transparent: true,
        resizable: false,
        kiosk: false,
        icon: __dirname + './icon.icns',
        title: 'Radio Record',
        webPreferences: {
            nodeIntegration: true,
            devTools: false,
            allowRunningInsecureContent: true,
        }
    });

    win.loadFile('index.html');

    win.on('close', (e) => {
        if (willQuitApp && process.platform === 'darwin') {
            win = null;
            return;
        }

        e.preventDefault();
        win.hide();
    });

    win.on('closed', () => {
        win = null;

        if (process.platform !== 'darwin') {
            app.quit();
        }
    })
}

app.on('before-quit', () => willQuitApp = true);
app.on('ready', createWindow);
app.on('activate', () => {
    if (win) {
        win.restore();
        return
    }

    createWindow()
});