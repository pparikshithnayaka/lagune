/* tslint:disable: no-console */
import {
  app, BrowserWindow, dialog,
  ipcMain as ipc,
  MessageBoxOptions, shell,
} from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import * as path from 'path';
import updater from 'update-electron-app';
import * as url from 'url';

export class Main {

  /** The main window */
  private mainWindow: Electron.BrowserWindow | null = null;

  /** Whetehr production build or not */
  private isProduction = process.env.NODE_ENV === 'production';

  /** Whether Electron running on darwin (macOS) */
  private isDarwin = process.platform === 'darwin';

  /** Whether Electron running with webpack-dev-server */
  private isDevServer = process.env.DEV_SERVER === 'YES';

  constructor () {
    this.createWindow();

    // Electorn events
    app.once('ready', this.onReady);
    app.on('activate', this.onActivate);
    app.on('window-all-closed', this.onWindowAllClosed);

    // IPC events
    ipc.on('show-message-box', this.onShowMessageBox);

    // Main window events
    if (this.mainWindow !== null) {
      this.mainWindow.once('ready-to-show', this.onReadyToShow);
      this.mainWindow.webContents.on('new-window', this.onNewWindow);
    }

    // Updates application itself if any new version released in GitHub
    if (this.isProduction) {
      updater.updater({ updateInterval: '1 hour' });
    }
  }

  /**
   * Create window
   * - About security policy, see https://electronjs.org/docs/tutorial/security
   * - While `isDevServer` is true, HTML/JS/CSS contents will be served from http://localhost:8080
   *   which is the path of webpack-dev-server. therefore, `allowRunningInsecureContent` need to be true
   */
  protected createWindow () {
    this.mainWindow = new BrowserWindow({
      show: false,
      height: 700,
      width: 380,
      minWidth : 380,
      frame: !this.isDarwin,
      titleBarStyle: this.isDarwin ? 'hidden' : 'hiddenInset',
      webPreferences: {
        nodeIntegration: this.isDevServer,
        contextIsolation: !this.isDevServer,
        webSecurity: !this.isDevServer && this.isProduction,
        allowRunningInsecureContent: this.isDevServer && !this.isProduction,
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
   * Create window on ready
   */
  protected onReady = () => {
    this.createWindow();
  }

  /**
   * Show main window on ready to show
   */
  protected onReadyToShow = async () => {
    if (this.mainWindow !== null) {
      this.mainWindow.show();
    }

    // Installing React Developer Tools and Redux DevTools
    if (!this.isProduction) {
      try {
        await installExtension(REDUX_DEVTOOLS);
        await installExtension(REACT_DEVELOPER_TOOLS);
      } catch (error) {
        console.log(`<Lagune> Chrome extension install failed: ${error}`);
      }
    }
  }

  /**
   * Create main window when app activated
   */
  protected onActivate = () => {
    if (this.mainWindow === null) {
      this.createWindow();
    }
  }

  /**
   * Quite app when all window closed except darwin
   */
  protected onWindowAllClosed = () => {
    if (!this.isDarwin) {
      app.quit();
    }
  }

  /**
   * Overwrite target='__blank' behaviour to open in the default browser
   * @param e Event
   * @param arg URL to open
   */
  protected onNewWindow = (e: Event, arg: string) => {
    e.preventDefault();
    shell.openExternal(arg);
  }

  /**
   * Show error dialog when `show-error` event emitted
   * @param _ Event
   * @param message Textual error message
   */
  protected onShowMessageBox = (_: Event, options: MessageBoxOptions) => {
    dialog.showMessageBox(options);
  }
}

export default new Main();
