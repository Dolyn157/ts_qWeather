import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    weatherAPI: {
      onUpdateWeather: (callback: (value: unknown) => void) => void
      getAlert: (baseURL: string) => Promise<unknown>
      onWeatherNotificationClicked: (cb: () => void) => void
    }
  }
}
