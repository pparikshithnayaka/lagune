/* tslint:disable: no-console */
import {
  app, BrowserWindow,
  dialog,
  ipcMain as ipc,
  shell,
} from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import * as path from 'path';
import * as updater from 'update-electron-app';
import * as url from 'url';

export class Main {

  /** Whetehr production build or not */
  private isProduction = process.env.NODE_ENV === 'production';

  /** Whether Electron running on darwin (macOS) */
  private isDarwin = process.platform === 'darwin';

  /** Whether Electron running with webpack-dev-server */
  private isDevServer = process.env.DEV_SERVER === 'YES';

  /** The main window */
  private mainWindow: Electron.BrowserWindow|null = null;

  constructor () {
    this.createWindow();

    // Electorn events
    app.on('ready', this.onReady);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);

    // IPC events
    ipc.on('show-error', this.onShowError);

    // Main window events
    if (this.mainWindow !== null) {
      this.mainWindow.once('ready-to-show', this.onReadyToShow);
      this.mainWindow.webContents.on('new-window', this.onNewWindow);
    }

    // Updates application itself if any new version released in GitHub
    if (this.isProduction) {
      updater.updater({ repo: 'lagunehq/lagune', updateInterval: '1 hour' });
    }
  }

  private createWindow () {
    this.mainWindow = new BrowserWindow({
      show: false,
      height: 700,
      width: 380,
      minWidth : 380,
      frame: !this.isDarwin,
      titleBarStyle: this.isDarwin ? 'hidden' : 'hiddenInset',
      webPreferences: {
        // Security policy
        // See: https://electronjs.org/docs/tutorial/security
        nodeIntegration: this.isDevServer,
        contextIsolation: !this.isDevServer,

        // `DEV_SERVER` is a flag which represents whether webpack's running with dev-server
        // If you're using webpack-dev-server, contents will be served from `http://localhost:8080`
        // thus HTTP need to be granted while you're developing
        webSecurity: (!this.isDevServer && this.isProduction),
        allowRunningInsecureContent: !(!this.isDevServer && this.isProduction),
      },
    });

    this.mainWindow.loadURL(this.isDevServer ?
      'http://localhost:8080' :
      url.format({
        pathname: path.resolve(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
      },
    ));
  }

  /**
   * Create main window on ready
   */
  private onReady () {
    this.createWindow();
  }

  /**
   * Show main window on ready to show
   */
  private onReadyToShow () {
    if (this.mainWindow !== null) {
      this.mainWindow.show();
    }

    // Installing React Developer Tools and Redux DevTools
    if (!this.isProduction) {
      installExtension(REDUX_DEVTOOLS);
      installExtension(REACT_DEVELOPER_TOOLS);
    }
  }

  /**
   * Create main window when app activated
   */
  private onActivate () {
    if (this.mainWindow === null) {
      this.createWindow();
    }
  }

  /**
   * Quite app when all window closed except darwin
   */
  private onWindowAllClosed () {
    if (!this.isDarwin) {
      app.quit();
    }
  }

  /**
   * Overwrite target='__blank' behaviour to open in the default browser
   * @param e Event
   * @param arg URL to open
   */
  private onNewWindow (e: Event, arg: string) {
    e.preventDefault();
    shell.openExternal(arg);
  }

  /**
   * Show error dialog when `show-error` event emitted
   * @param _ Event
   * @param message Textual error message
   */
  private onShowError (_: Event, message: string) {
    dialog.showMessageBox({
      type: 'error',
      buttons: [],
      message,
    });
  }
}

export default new Main();
