import {app, shell, BrowserWindow, ipcMain, dialog} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import {getCityMap, fetchUrl} from './utils'
import path from 'node:path'
import schedule from 'node-schedule'
import icon from '../../resources/icon.png?asset'

//全局变量
let mainWindow: BrowserWindow

//  定时任务
let periodRule:string = '1/15 * * * * *' //秒分时日月周
let job1 //定时任务1
let isTaskRunning: boolean = false;

//  和风API地址以及要查的城市
const QWetherBaseURL: string = "https://devapi.qweather.com/v7/weather/now?"
let cityID: string = "101281009" //湛江
let cityName: string = ""
let APIKey: string = ""
//一些静态文件地址

// 加载城市名称字典
let cityMap1 = new Map(); //城市字典 map 这个分号不能少，不然翻译出来的js文件格式会错
//非 ES 环境无法在主代码块当中使用 await 关键字调用异步函数，解决办法一般是放在一个匿名函数当中
(async ()=> {
  let csvFile: string = path.join(path.dirname(new URL('../',import.meta.url).pathname), 'resources','China-City-List-latest.csv')
  csvFile = csvFile.slice(1)
  console.log(csvFile)
  cityMap1 = await getCityMap(csvFile);
  console.log(cityMap1)
})();

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // 取消所有计划的任务
    schedule.gracefulShutdown()
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// IPC
ipcMain.on('mission', (_event, value) => {
  console.log(value)
  if (!cityMap1.get(value)){
    dialog.showMessageBox({
      type:'info',
      title: '提示',
      message: '在字典中找不到该城市',
      buttons:['ok']
    })
  }else{
    if (isTaskRunning===true) {
      job1.cancel()
    }

    cityID = cityMap1.get(value).Location_ID
    cityName = value
    job1 = schedule.scheduleJob("weather", periodRule, async function (){
      const data: object | undefined = await handleGetAlert(null, QWetherBaseURL);
      if (data == undefined){
        console.log('设置任务失败')
        return
      }
      const key1: string = "cityID"
      const key4: string = "cityName"
      const key2: string = "latitude"
      const key3: string = "longitude"
      data[key1] = cityID
      data[key2] = cityMap1.get(value).Latitude
      data[key3] = cityMap1.get(value).Longitude
      data[key4] = cityName
      //console.log('Weather Data:', data);
      mainWindow.webContents.send('update-weather', data)
    })
    isTaskRunning = true; // 标记任务开始执行
    console.log('任务开始执行');
  }
})

ipcMain.on('apiKey', (_event, value) => {
  APIKey = value
  console.log(value)
})

ipcMain.on('end-mission', () => {
  job1.cancel()
  isTaskRunning = false; // 重置标志

  console.log('提醒任务已结束')
})

ipcMain.on('selected-period', (_event, value) => {
  switch (value){
    case "seconds":
      periodRule = '1/15 * * * * *' //秒分
      break
    case "minutes":
      periodRule = '0 */1 * * * *'
      break
    case "hours":
      periodRule = '0 0 */1 * * *'
  }
  if (isTaskRunning) {
    schedule.rescheduleJob(job1, periodRule)
  }
  console.log(periodRule)
})

async function handleGetAlert(event, baseURL: string): Promise<object | undefined> {
  const targetURL: string = `${baseURL}location=${cityID}&key=${APIKey}`
  console.log(targetURL + event)
  let data: NonNullable<unknown>
  try {
    data = await fetchUrl(targetURL);
    //console.log('获取的数据:', data);
    return data
    // 在这里执行下一步代码
    // 例如，更新UI或进行其他操作
  } catch (error) {
    console.error('处理数据时出错:', error);
    return
  }
}

ipcMain.handle('get-alert', handleGetAlert)
