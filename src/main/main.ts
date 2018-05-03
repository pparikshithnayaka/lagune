/* tslint:disable: no-console */

import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import updateElectronApp from 'update-electron-app';

updateElectronApp({
  repo: 'lagunehq/lagune',
  updateInterval: '1 hour',
});

let mainWindow: Electron.BrowserWindow | null;

function createWindow () {
  mainWindow = new BrowserWindow({
    frame: process.platform !== 'darwin',
    height: 600,
    width: 380,
    minWidth : 380,
    show: false,
    titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'hiddenInset',
    webPreferences: {
      webSecurity: true,
      nodeIntegration: false,
      contextIsolation: true,
      allowRunningInsecureContent: false,
    },
  });

  mainWindow.loadURL(process.env.WATCH ? 'http://localhost:8080' :
    url.format({
      pathname: path.resolve(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    },
  ));

  if ( process.env.NODE_ENV === 'development' ) {
    [REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS].forEach((extension) => {
      installExtension(extension)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
    });
  }

  mainWindow.once('ready-to-show', () => {
    if ( mainWindow !== null ) {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
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
