'use strict'

const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const path = require('path')
require('electron-reload')(__dirname)

let mainWindow;

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, '../assets/vault.png'),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false,
            preload: path.join(__dirname, '/preload/preload.js')
        }
    });
    mainWindow.loadFile(path.join(__dirname, '/login/login.html'))
    /*Menu.setApplicationMenu(Menu.buildFromTemplate(customMenu.mainMenu));*/
}

app.whenReady().then(() => {
    createWindow()
    // For macOS, open a window if none are open
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

/// Section used to respond to renderer process
ipcMain.on('load-page', (event, arg) => {
    mainWindow.loadFile(arg)
})

ipcMain.on('send-alert', (event, arg) => {
    dialog.showErrorBox(arg[0], arg[1])
})