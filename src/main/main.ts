/* tslint:disable: no-console */
import { app, BrowserWindow, dialog, ipcMain as ipc, shell } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import * as path from 'path';
import { updater } from 'update-electron-app';
import * as url from 'url';

// Electron's auto updater
// Updates application itself if new version released in GitHub
updater({
  repo: 'lagunehq/lagune',
  updateInterval: '1 hour',
});


let mainWindow: Electron.BrowserWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    show: false,
    height: 700,
    width: 380,
    minWidth : 380,
    frame: process.platform !== 'darwin',
    titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'hiddenInset',
    webPreferences: {
      // Security policy
      // See: https://electronjs.org/docs/tutorial/security
      nodeIntegration: process.env.DEV_SERVER === 'YES',
      contextIsolation: process.env.DEV_SERVER !== 'YES',

      // `DEV_SERVER` is a flag which represents whether webpack's running with dev-server
      // If you're using webpack-dev-server, contents will be served from `http://localhost:8080`
      // thus HTTP need to be granted while you're developing
      webSecurity:                  (process.env.DEV_SERVER !== 'YES' && process.env.NODE_ENV !== 'development'),
      allowRunningInsecureContent: !(process.env.DEV_SERVER !== 'YES' && process.env.NODE_ENV !== 'development'),
    },
  });

  mainWindow.loadURL(process.env.DEV_SERVER === 'YES' ?
    'http://localhost:8080' :
    url.format({
      pathname: path.resolve(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    },
  ));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // Installing React Developer Tools
    // and Redux DevTools
    if ( process.env.NODE_ENV === 'development' ) {
      installExtension(REDUX_DEVTOOLS);
      installExtension(REACT_DEVELOPER_TOOLS);
    }
 });

  // Overwrite target='__blank' behaviour to open in the default browser
  mainWindow.webContents.on('new-window', (e: Event, arg: string) => {
    e.preventDefault();
    shell.openExternal(arg);
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipc.on('show-error', (_: Event, message: string) => {
  dialog.showMessageBox({
    type: 'error',
    buttons: [],
    message,
  });
});
