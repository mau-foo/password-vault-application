const main = require('main')

const mainMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    main.app.quit()
                }
            }
        ]
    }
]