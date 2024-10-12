
<template>
  <div class="box">
    <div class="text">
      请输入要查询的城市名称
      <br />
      <input class='textInput' v-model="cityName">
      <br />
    </div>
    <br />
    <div class="switch">
      <form>
        <p class="tip">请选择提醒时间间隔</p>
        <select v-model="period1" class="selectInput" name="period1" @click="ipcSwitchPeriod">
          <option value="seconds">15秒</option>
          <option value="minutes">分</option>
          <option value="hours">时</option>
        </select>
      </form>

    </div>
  </div>
  <div class="actions">
    <div class="action">
      <a id='startMission' target="_blank" rel="noreferrer" @click="ipcHandleStartMission">开始提醒</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandleEndMission">停止提醒</a>
    </div>
    <div class="action">
      <RouterLink to="/"  >返回主页</RouterLink>
    </div>
  </div>
  <Versions />
</template>

<script setup lang="ts">
import Versions from "@renderer/components/Versions.vue";
import {ref} from "vue"

const cityName = ref('')
const period1 = ref('')

//使用组合式 API 处理 dom 事件
const ipcHandleStartMission = () => {
  window.electron.ipcRenderer.send('mission', cityName.value)
}
const ipcHandleEndMission = () => window.electron.ipcRenderer.send('end-mission')

const ipcSwitchPeriod = () => {

  window.electron.ipcRenderer.send('selected-period', period1.value)
}

</script>

<style scoped>

.box{
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
}
.textInput{
  margin-top: 20px;

  width: 30%; /* 让文本框的宽度与父元素相同 */
  color: lightpink;
  box-sizing: border-box; /* 确保内边距和边框包含在宽度内 */
  background-color:transparent; /* 半透明白色 */
  border:1px solid #ffffff;
}

.selectInput{
  margin-top: 20px;
  width: 50%; /* 让文本框的宽度与父元素相同 */
  color: lightpink;
  margin-left: 25%;
  background-color:transparent; /* 半透明白色 */
  border:1px solid #ffffff;
}

</style>
