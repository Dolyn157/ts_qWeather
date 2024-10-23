<script setup lang="ts">
import { onMounted } from 'vue'
import Warning from '@renderer/components/Details/Warning.vue'
import Tabs from './Tabs.vue'
import Ventusky from '@renderer/components/Details/Ventusky.vue'
import Weather from '@renderer/components/Details/Weather.vue' // Import the Tabs component
import { activeTab, cityName } from '../../main'

const tabs = [
  { name: 'tab1', label: '天气概况' },
  { name: 'tab2', label: '灾害预警' },
  { name: 'tab3', label: 'Ventusky' }
]

onMounted(() => {
  activeTab.value = tabs[0].name
})
</script>

<template>
  <Tabs :tabs="tabs">
  </Tabs>

  <div class="scrollable-container">

    <div v-if="activeTab === 'tab1'" class="abc">
      <div class="title">
        <h3 id="name">{{ cityName }} 天气</h3>
      </div>
      <Weather />
    </div>
    <div v-if="activeTab === 'tab2'" class="abc">
      <div class="title">
        <h3 id="name">{{ cityName }} 预警</h3>
      </div>
      <Warning />
    </div>
    <div v-if="activeTab === 'tab3'" class="abc">
      <Ventusky />
    </div>
  </div>
  <div class="actions">
    <div class="action">
      <RouterLink to="/setting">返回主页</RouterLink>
    </div>
  </div>
</template>

<style scoped>

h3 {
  text-align: center;
  margin-top: 1em;
}
.scrollable-container {
  overflow-y: auto; /* 启用竖向滚动条 */

  width: 100vh;
  background-color: transparent; /* 可选：设置背景颜色 */
}
.abc {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.actions {
  position: absolute;
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
}
.action {
  display: flex; /* 使用 Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
</style>

