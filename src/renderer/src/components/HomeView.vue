<script setup lang="ts">
import Versions from './Versions.vue'
import router from "@renderer/router/router";

const startUse = (event) => {
  let text: string = document.getElementById('apiKey').value
  if (text) {
    window.electron.ipcRenderer.send('apiKey', text)
    localStorage.setItem('api_key', text)
  } else {
    const apiKey:string = localStorage.getItem('api_key')
    if (!apiKey) {
      alert('APIkey 不能为空')
      return
    }
    window.electron.ipcRenderer.send('apiKey', apiKey)
  }
  router.push('/setting')
}
</script>

<template>
  <img alt="logo" class="logo" src="../assets/electron.svg" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    欢迎使用朵琳和风天气提醒小工具
  </div>
  <p class="tip">请输入你的和风天气APIKey</p>
  <br/>
  <input class='textInput' id="apiKey">
  <div class="actions">
    <div class="action">
      <a @click="startUse">开始使用</a>
    </div>
    <div class="action">

    </div>
  </div>
  <Versions />
</template>

<style scoped>

</style>
