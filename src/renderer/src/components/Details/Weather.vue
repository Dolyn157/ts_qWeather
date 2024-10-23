<script setup lang="ts">
import 'qweather-icons/font/qweather-icons.css'
import { ref, onBeforeMount} from "vue";

interface WeatherResponse {
  cloud: string;
  dew: string;
  feelsLike: string;
  humidity: string;
  icon: string;
  obsTime: string;
  precip: string;
  pressure: string;
  temp: string;
  text: string;
  vis: string;
  wind360: string;
  windDir: string;
  windScale: string;
  windSpeed: string;
}
interface ServerResponse {
  code: string
  updateTime: string
  fxLink: string
  now: WeatherResponse
  refer: object
  cityID: string
  latitude: number
  longitude: number
  cityName: string
}

const qWeatherBaseURL:string = "https://devapi.qweather.com/v7/weather/now?"
const weatherData = ref('')
const isLoading = ref(true)
const loadingMsg = ref("加载中")
let initialWeatherResponse: WeatherResponse = {
  cloud: '',
  dew: '',
  feelsLike: '',
  humidity: '',
  icon: '',
  obsTime: '',
  precip: '',
  pressure: '',
  temp: '',
  text: '',
  vis: '',
  wind360: '',
  windDir: '',
  windScale: '',
  windSpeed: ''
};
let finalData: ServerResponse = {
  code: '',
  updateTime: '',
  fxLink: '',
  now: initialWeatherResponse,
  refer: {},
  cityID: '',
  latitude: 0,
  longitude: 0,
  cityName: ''
}

onBeforeMount(async () => {
  weatherData.value = await window.weatherAPI.getAlert(qWeatherBaseURL) as string
  if (!weatherData.value) {
    loadingMsg.value = "数据未加载,点我重1新加载"
    return
  }
  const jsonString = JSON.stringify(weatherData.value)
  finalData = JSON.parse(jsonString) as ServerResponse
  console.log(finalData)
  isLoading.value = false
})

function getIcon(icon: string): string {
  return 'qi-' + icon + '-fill'
}
</script>


<template>
  <div v-if="isLoading">{{loadingMsg}}</div>
  <div v-else class="l-page-city-weather">
    <div class="container">
      <div class="c-city-weather-current city-weather-cloudy">
        <div class="current-weather__bg">
          <p class="current-time">{{finalData.now.obsTime}}</p>
          <div class="current-live">
            <div class="current-live__item">
              <i :class="getIcon(finalData.now.icon)"></i>
            </div>
            <div class="current-live__item">
              <p>{{finalData.now.temp}}℃</p>
              <p>{{finalData.now.text}}</p>
            </div>
            <div class="current-basic d-flex justify-content-between align-items-center">
              <div class="block1">
                <p id="windScale">{{finalData.now.windScale}}级</p>
                <p id="windDirection">{{finalData.now.windDir}}</p>
              </div>
              <div class="block1">
                <p id="humidity">{{finalData.now.humidity}}%</p>
                <p id="label1">相对湿度</p>
              </div>
              <div class="block1">
                <p id="windLevel">{{finalData.now.vis}}公里</p>
                <p id="windDirection">能见度</p>
              </div>
            </div>
          </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 24px;
  color: #1b1b1f;
}

.l-page-city-weather {


  box-sizing: border-box; /* 包括 padding 和 border 在内 */
  padding: 20px 0 20px;
}

.container {
  max-width: 1040px;
  padding: 0 20px; /* 合并左右 padding */
}

.current-time{
  font-size: 16px;
  text-align: right;
  color: #FEFEAE;
}

.current-basic {
  padding: 10px 20px;
  margin: 10px 0px;
  background-color: rgba(190,190,190, 25%);
  border-radius: 16px;
}

.city-weather-cloudy {
  background-image: linear-gradient(225deg, #d0dae8, #ccd4df 55%, #a5b3c5);
}

.c-city-weather-current {
  border: none;
  border-radius: 16px;
}

.c-city-weather-current .current-live {
  margin-top: 6px;
  white-space: nowrap;
}

.c-city-weather-current .current-live .current-live__item {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  padding: 10px 10px;
  width: 50%;
  max-width: 50%;
}

.c-city-weather-current .current-live .current-live__item:first-child {
  text-align: right;
  font-size: 64px;
}

.justify-content-between{
  justify-content: space-between !important;
}

.align-items-center {
  align-items: center !important;
}

.d-flex {
  display: flex !important;
}

/* 合并媒体查询 */
@media (max-width: 739px) {
  .c-city-weather-current .current-weather__bg {
    padding: 16px 20px 20px;
    background-size: 346px auto;
  }

  .c-city-weather-current .current-live {
    margin-top: 32px;
  }
}

@media (max-width: 879px) {
  .c-city-weather-current .current-weather__bg {
    background-size: 432px auto;
  }
}
</style>
