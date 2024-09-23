
<template>

  <div class="text">
    请输入要查询的城市名称
    <br />
    <input class='textInput' id="city">
    <br />
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

//使用组合式 API 处理 dom 事件
const ipcHandleStartMission = () => {
  let text = document.getElementById('city').value
  window.electron.ipcRenderer.send('mission', text)
}
const ipcHandleEndMission = () => window.electron.ipcRenderer.send('end-mission')

</script>

<style scoped>

.textInput{
  margin-top: 25px;
  width: 30%; /* 让文本框的宽度与父元素相同 */
  color: lightpink;
  box-sizing: border-box; /* 确保内边距和边框包含在宽度内 */
  background-color: rgba(130, 130, 140, 0.8); /* 半透明白色 */
}

</style>
