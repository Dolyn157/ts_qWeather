import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    weatherAPI: {
      onUpdateWeather: (callback: (value: unknown) => boolean) => void
      onSendLatAndLong: (callback: (value: object) => void) => void
      getAlert: (baseURL: string) => Promise<unknown>
      startMission: (value) => Promise<unknown>
      onWeatherNotificationClicked: (cb: () => void) => void
    }
  }
}
