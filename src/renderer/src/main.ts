import './assets/main.css'

import { Ref, createApp, ref } from 'vue'
import App from './App.vue'
import router from "./router/router"

const weatherIcons: Record<string, string> = import.meta.glob('./assets/weather-icons/*.svg', { eager: true, query: 'url' })

const app = createApp(App);
app.use(router);
app.mount('#app');

export const cityName: Ref<string> = ref('')
export const isButtonEnable: Ref<boolean> = ref(true) //设置页面的开始提醒按钮是否可用

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

  console.log(weatherIcons[`./assets/weather-icons/${icon}.svg`])

  const notify: window.Notification = new window.Notification(notifyTitle,
    {
      body: `采样时间: ${obsTime}
温度℃: ${temp}
天气状况: ${text}
风向:${windDir}
风力等级:${windScale}`,
    icon: weatherIcons[`./assets/weather-icons/${icon}.svg`].default
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
