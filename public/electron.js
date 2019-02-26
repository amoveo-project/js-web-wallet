// Modules to control application life and create native browser window
const { app, BrowserWindow, shell, ipcMain, Menu } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js")
    },
    icon: path.join(__dirname, "icon.png")
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS
    } = require("electron-devtools-installer");

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`);

        // Open the DevTools.
        mainWindow.webContents.openDevTools();
      })
      .catch(err => {
        console.log("An error occurred: ", err);
      });
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    ipcMain.on("open-external-window", (event, arg) => {
      shell.openExternal(arg);
    });
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function generateMenu() {
  const template = [
    {
      label: "File",
      submenu: [{ role: "about" }, { role: "quit" }]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      role: "window",
      submenu: [{ role: "minimize" }, { role: "close" }]
    },
    {
      role: "help",
      submenu: [
        {
          click() {
            require("electron").shell.openExternal(
              "https://github.com/amoveo-project/js-web-wallet/"
            );
          },
          label: "Learn More"
        },
        {
          click() {
            require("electron").shell.openExternal(
              "https://github.com/amoveo-project/js-web-wallet/issues"
            );
          },
          label: "File Issue on GitHub"
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  generateMenu();
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("load-page", (event, arg) => {
  mainWindow.loadURL(arg);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
