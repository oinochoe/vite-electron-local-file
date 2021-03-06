import { app, BrowserWindow } from 'electron';
import path from 'path';

const IS_DEV = process.env.IS_IN_DEVELOPMENT || false;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    });

    if (IS_DEV) {
        win.loadURL('http://localhost:3000');
        win.webContents.openDevTools();
    } else {
        win.loadURL(`file://${path.join(__dirname, '..', 'dist', 'index.html')}`);
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    // On macOS, it's common for an app and its menu bar to remain
    // active until the user shuts down the application via the Cmd + Q shortcut
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS, if an application is in the dock, it is common for a window to be created after
    // clicking on the icon in the dock if there are no windows active
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
