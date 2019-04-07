const { app, BrowserWindow, remote } = require('electron');
const MenuManager = require('./app/src/global/menu.js');
const UpdateManager = require('./app/src/global/update.js');
const { installExtensions, getPreferences } = require('./app/src/global/utils.js');

let mainWindow;
const isDevelopment = process.env.NODE_ENV === 'development';
const appIcon = (process.platform !== 'win32') ? `${__dirname}/app/src/assets/logo.png` : `${__dirname}/app/src/assets/logo.ico`;

const menuManager = new MenuManager();
const updateManager = new UpdateManager();

isDevelopment && require('electron-reload')(__dirname);

async function createWindow() {
    const { width, height, x, y, maximized } = getPreferences(app, remote, 'preferences', 'windowBounds');
    mainWindow = new BrowserWindow({ x, y, width, height, maximized, minWidth: 700, minHeight: 700, icon: appIcon, nodeIntegration: false, backgroundColor: '#2f3243' });
    mainWindow.loadFile('build/index.html');

    // set main window
    menuManager.setWindow(mainWindow);
    updateManager.setWindow(mainWindow);

    // build menu
    menuManager.buildMenu();

    // check for update
    // updateManager.checkForUpdate();

    maximized && mainWindow.maximize();

    mainWindow.once('ready-to-show', () => { mainWindow.show(); });
    mainWindow.on('closed', () => { mainWindow = null; });

    if (isDevelopment) {
        mainWindow.webContents.openDevTools({ mode: 'bottom' });
        await installExtensions();
    }
}

app.on('ready', createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit(); } });
app.on('activate', () => { if (mainWindow === null) { createWindow(); } });

