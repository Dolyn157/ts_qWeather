import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {ipcRenderer} from "electron/renderer";

// Custom APIs for renderer
const api = {}

contextBridge.exposeInMainWorld('weatherAPI', {
  onUpdateWeather: (callback) => ipcRenderer.on('update-weather', (_event, value) => callback(value)),
})

contextBridge.exposeInMainWorld('userSettingsAPI', {

})

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
