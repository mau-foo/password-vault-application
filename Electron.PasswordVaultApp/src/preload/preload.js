const { contextBridge, ipcRenderer } = require('electron')
const mysql = require('mysql2')

function loadWebPage(webPage) {
    ipcRenderer.send('load-page', webPage);
};

function popNotification(title, message) {
    ipcRenderer.send('send-alert', [title, message]);
};

contextBridge.exposeInMainWorld('connectionAPI', {
    databaseConnection(config) {
        let connection = mysql.createConnection(config);

        connection.connect((err) => {
            if (err) {
                popNotification("Error", "Invalid credentials. Please try again.");
            } else {
                loadWebPage('../src/menu/menu.html');
            }
        });
        connection.end();
    }
});