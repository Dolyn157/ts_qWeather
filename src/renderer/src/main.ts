import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router.ts"

createApp(App).
  use(router).
  mount('#app')



window.weatherAPI.onUpdateWeather((value) => {
  const Noti_Title = `和风天气提醒您：`
  const cityID = value.now.cityID
  const obsTime = value.now.obsTime
  const temp = value.now.temp
  const text = value.now.text
  const windDir = value.now.windDir
  const windScale = value.now.windScale

  let Notif: window.Notification = new window.Notification(Noti_Title,
    { body: `\n"采样时间": ${obsTime}, "\n温度℃": ${temp}, "\n天气状况": ${text}, "\n风向":${windDir}, "\n风力等级":${windScale}`})

  localStorage.setItem('city_ID', cityID)

  Notif.onclick = function () {
    router.push('/details')
  }
})


