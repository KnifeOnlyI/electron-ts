import * as path from 'path';

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('electron-reloader')(module);
// eslint-disable-next-line no-empty
} catch (_) {
}

import {app, BrowserWindow} from 'electron';

async function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: process.env.NODE_ENV !== 'production'
    },
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.maximize();

  await mainWindow.loadFile(path.join(__dirname, '../../public/index.html'));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  await createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
