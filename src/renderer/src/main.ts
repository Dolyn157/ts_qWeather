import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router/router'

const app = createApp(App);
app.use(router);
app.mount('#app');

export const cityName = ref('')
export const isButtonEnable = ref(true) //设置页面的开始提醒按钮是否可用

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
  const Noti_Title = `和风天气提醒您：`

  if (value == undefined){
    return
  }
  const notifyInfo1: notifyInfo = JSON.parse(JSON.stringify(value))
  // eslint-disable-next-line prefer-const
  console.log("Notifyinfos" + notifyInfo1)

  const cityID = notifyInfo1.cityID
  const obsTime = notifyInfo1.now.obsTime
  const temp = notifyInfo1.now.temp
  const text = notifyInfo1.now.text
  const windDir = notifyInfo1.now.windDir
  const windScale = notifyInfo1.now.windScale
  const Latitude = notifyInfo1.latitude
  const Longitude = notifyInfo1.longitude

  const Notify = new window.Notification(Noti_Title,
    { body: `\n"采样时间": ${obsTime}, "\n温度℃": ${temp}, "\n天气状况": ${text}, "\n风向":${windDir}, "\n风力等级":${windScale}`})

  localStorage.setItem('city_ID', cityID)
  //https://pinia.vuejs.org/ 全局状态
  app.provide('latitude', Latitude)
  app.provide('longitude', Longitude)
  Notify.onclick = function () {
    router.push('/details')
  }
})
