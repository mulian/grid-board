import { app, BrowserWindow, screen, session, Menu, ipcMain, dialog } from 'electron';
import * as fs from 'fs'
import * as path from 'path';
import * as url from 'url';

import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  session.defaultSession.allowNTLMCredentialsForDomains('*')
  Menu.setApplicationMenu(null)

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  ipcMain.on("close-app",(event,arg) => {
    app.exit(0)
  })

  ipcMain.on("dev-tools",(event,activate:boolean) => {
    if(activate==null) { //toggle
      if(win.webContents.isDevToolsOpened()) win.webContents.closeDevTools()
      else win.webContents.openDevTools()
    }
    else if(activate) win.webContents.openDevTools()
    else win.webContents.closeDevTools()
  })

  ipcMain.on("reload",(event) => {
    win.webContents.reload()
  })
  ipcMain.on("isServ",(event) => {
    event.returnValue=serve
  })

  /**
   * @param setFullscreenBool if null toggle, true maximize, false unmaximize
   */
  ipcMain.on("setFullscreen",(event,setFullscreenBool) => {
    if(setFullscreenBool==null) {
      setFullscreenBool = !win.isFullScreen()
    }
    win.setFullScreen(setFullscreenBool)
    event.returnValue=serve
  })
  ipcMain.on("isMaximized",(event) => {
    event.returnValue=win.isMaximized()
  })

  ipcMain.on("save-json",(event,arg) => {
    dialog.showSaveDialog(win,{
      
    }).then((value) => {
      if(!value.canceled) {
        fs.writeFile(value.filePath,JSON.stringify(arg),(err) => {
          if(err) {
            console.log("Error on save file.");
          }
          else {
            console.log("file was saved to "+value.filePath);
            
          }
        })
      }
    })
  })

  ipcMain.on("load-json",(event,arg) => {
    dialog.showOpenDialog({ 
      properties: ['openFile'], 
      filters: [ {
        name: "JSON",
        extensions: ['json']
      } ]
    }).then( (value) => {
      fs.readFile(value.filePaths[0], 'utf-8', (err, data) => {
        if(err){
            alert("An error ocurred reading the file :" + err.message);
            event.returnValue = null
        }
  
        // Change how to handle the file content
        console.log("The file content is : " + data);
        event.returnValue = data
        
    });
    }).catch((reason) => {
      console.error(reason)
      event.returnValue = null
    })
  })

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    },
    title: "Gridler"
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  win.on("enter-full-screen",() => {
    ipcMain.emit("enter-full-screen")
  })
  win.on("leave-full-screen",() => {
    ipcMain.emit("leave-full-screen")
  })

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
