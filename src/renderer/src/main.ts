import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from "./router/router.ts"

const app = createApp(App);
app.use(router);
app.mount('#app');

export const cityName: string = ref('')
export const isButtonEnable: boolean = ref(true) //设置页面的开始提醒按钮是否可用

window.weatherAPI.onUpdateWeather((value) => {
  const Noti_Title = `和风天气提醒您：`
  const cityID = value.cityID
  const obsTime = value.now.obsTime
  const temp = value.now.temp
  const text = value.now.text
  const windDir = value.now.windDir
  const windScale = value.now.windScale
  const Latitude = value.latitude
  const Longitude = value.longitude

  const Notify: window.Notification = new window.Notification(Noti_Title,
    { body: `\n"采样时间": ${obsTime}, "\n温度℃": ${temp}, "\n天气状况": ${text}, "\n风向":${windDir}, "\n风力等级":${windScale}`})

  localStorage.setItem('city_ID', cityID)
  //https://pinia.vuejs.org/ 全局状态
  app.provide('latitude', Latitude)
  app.provide('longitude', Longitude)
  console.log(value.latitude + '经纬度')
  Notify.onclick = function () {
    router.push('/details')
  }
})
