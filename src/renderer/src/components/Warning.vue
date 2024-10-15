<script setup lang="ts">
import {onBeforeMount, ref} from 'vue'
import {Gale, Typhoon, Thunderstorm, Fog, WarningSign, Monsoon, Lightning, Heavyrain, Dizhizaihai} from '../assets.ts'


const qWeatherAlertURL:string = "https://devapi.qweather.com/v7/warning/now?"
const alertData = ref(null)
const isLoading = ref(true)
const loadSuccess = ref(false)
const loadingMsg = ref("加载中")
let warningLevel = ref('yellow')
let warnings = ref(null)

onBeforeMount(async () => {
  alertData.value = await window.weatherAPI.getAlert(qWeatherAlertURL)

  if (!alertData.value) {
    loadingMsg.value = "数据未加载,点我重1新加载"
    isLoading.value = false
    return
  }
  if(alertData.value.warning.length == 0) {
    loadingMsg.value = "暂时未查询到该地区有灾害提醒"
    isLoading.value = false
    return
  }
  warnings = alertData.value.warning
  console.log(alertData.value)
  for (let i = 0; i < warnings.length; i++) {

    warningLevel[i] = warnings[i].level
    console.log(warningLevel[i])
  }
  isLoading.value = false
  loadSuccess.value = true
})
function warningClass (chineseInfo: string): string {
  return {
    "warning--yellow": chineseInfo === '黄色',
    "warning--blue": chineseInfo === '蓝色',
    "warning--orange": chineseInfo === '橙色'
  }
}


// 根据当前天气情况选择图标的方法
function setIcon(situation: string) {
  switch (situation) {
    case "雷电":
      return Lightning;
    case "台风":
      return Typhoon;
    case "大雾":
      return Fog;
    case "大风":
      return Gale;
    case "雷雨大风":
      return Thunderstorm;
    case "季风":
      return Monsoon;
    case "暴雨":
      return Heavyrain;
    case "地质灾害":
      return Dizhizaihai
    default:
      return WarningSign; // 默认图片
  }
}

</script>

<template>
  <div v-if="isLoading">加载中</div>
  <div v-else class="scrollable-container">
    <div v-if="loadSuccess">
      <div v-for="warning in warnings" :key="warning.id" class="weather-list__row">
        <div :class="warningClass(warning.level)" class="c-city-warning-events">
          <div class="warning-events__top d-flex align-items-center">
            <div class="warning-events__icon">
              <img class="sign" :src="setIcon(warning.typeName)" alt="警告"/>
            </div>
            <div class="cont">
              <h3>{{ warning.title }}</h3>
              <p>发布日期: {{ warning.pubTime }}</p>
            </div>
          </div>
          <p>{{ warning.text }}</p>
        </div>
      </div>
    </div>
    <div v-else class="weather-list__row">{{ loadingMsg }}</div>
  </div>
</template>

<style scoped>
h3{
  color: black;
}
p{
  color: black;
}
div {
  display: block;
  unicode-bidi: isolate;
}
.scrollable-container {
  max-height: 900px; /* 根据需要调整最大高度 */
  overflow-y: auto; /* 启用竖向滚动条 */
  padding: 10px; /* 可选：添加内边距 */
  background-color: transparent; /* 可选：设置背景颜色 */
}
.weather-list__row{
  margin: 20px 20px 20px;
}
.c-city-warning-events {
  border-radius: 16px;
  padding: 30px 16px 20px;
}
.warning-events__icon {
  flex: 0 0 80px;
  width: 0;
  height: 80px;
  text-align: center;
  border-radius: 10px;
  margin-right: 20px;
  box-sizing: border-box;
  padding: 10px 0;
}
.sign{
  height: 60px;
  width: 60px;
}
.warning--yellow {
  background-color: #FFFEEE;
}
.warning--blue {
  background-color: #ECF5FE;
}
.warning--orange {
  background-color: #FEF6EA;
}

.align-items-center {
  -ms-flex-align: center !important;
  align-items: center !important;
}

.d-flex {
  display: -ms-flexbox !important;
  display: flex !important;
}

</style>
