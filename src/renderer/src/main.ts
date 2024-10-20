import './assets/main.css'

import { Ref, createApp, ref } from 'vue'
import App from './App.vue'
import router from "./router/router"

import weatherIcons from './assets/weather-icons'

const app = createApp(App);
app.use(router);
app.mount('#app');

export const cityName: Ref<string> = ref('')
export const isButtonEnable: Ref<boolean> = ref(true) //设置页面的开始提醒按钮是否可用

interface notifyInfo {
  cityID: string
  now: nowInfo
  latitude: number
  longitude: number
}

interface nowInfo {
  obsTime: string
  temp: string
  time: string
  text: string
  windDir: string
  windScale: string
}

window.weatherAPI.onUpdateWeather((value) => {
  const notifyTitle = `和风天气提醒您：`
  const cityID = value.cityID
  const obsTime = value.now.obsTime
  const temp = value.now.temp
  const text = value.now.text
  const windDir = value.now.windDir
  const windScale = value.now.windScale
  const Latitude = value.latitude
  const Longitude = value.longitude
  const icon = value.now.icon

  const notify: window.Notification = new window.Notification(notifyTitle,
    {
      body: `采样时间: ${obsTime}
温度℃: ${temp}
天气状况: ${text}
风向:${windDir}
风力等级:${windScale}`,
    icon: weatherIcons[`./${icon}.svg`].default
})

  localStorage.setItem('city_ID', cityID)
  //https://pinia.vuejs.org/ 全局状态
  app.provide('latitude', Latitude)
  app.provide('longitude', Longitude)

  console.log(value.latitude + '经纬度')
  notify.onclick = function () {
    router.push('/details')
  }
})
