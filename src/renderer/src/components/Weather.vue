<script setup lang="ts">
import 'qweather-icons/font/qweather-icons.css'
import { ref, onBeforeMount} from "vue";


const qWeatherBaseURL:string = "https://devapi.qweather.com/v7/weather/now?"
const weatherData = ref('')
const isLoading = ref(true)
const loadingMsg = ref("加载中")


onBeforeMount(async () => {
  weatherData.value = await window.weatherAPI.getAlert(qWeatherBaseURL)
  if (!weatherData.value) {
    loadingMsg.value = "数据未加载,点我重1新加载"
    return
  }

  console.log(weatherData)
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
          <p class="current-time">{{weatherData.now.obsTime}}</p>
          <div class="current-live">
            <div class="current-live__item">
              <i :class="getIcon(weatherData.now.icon)"></i>
            </div>
            <div class="current-live__item">
              <p>{{weatherData.now.temp}}℃</p>
              <p>{{weatherData.now.text}}</p>
            </div>
            <div class="current-basic d-flex justify-content-between align-items-center">
              <div class="block1">
                <p id="windScale">{{weatherData.now.windScale}}级</p>
                <p id="windDirection">{{weatherData.now.windDir}}</p>
              </div>
              <div class="block1">
                <p id="humidity">{{weatherData.now.humidity}}%</p>
                <p id="label1">相对湿度</p>
              </div>
              <div class="block1">
                <p id="windLevel">{{weatherData.now.vis}}公里</p>
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
  height: 60vh;
  width: 90vh;
  box-sizing: border-box; /* 包括 padding 和 border 在内 */
  padding: 20px 0 30px;
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
