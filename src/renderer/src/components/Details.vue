<script setup lang="ts">

import Warning from "@renderer/components/Warning.vue";
import Tabs from './Tabs.vue';
import Ventusky from "@renderer/components/Ventusky.vue";
import Weather from "@renderer/components/Weather.vue"; // Import the Tabs component

const tabs = [
  { name: 'tab1', label: '天气概况' },
  { name: 'tab2', label: '灾害预警' },
  { name: 'tab3', label: 'Ventusky'}
];

</script>

<template>
  <div class="box scrollable-container">
    <Tabs :tabs="tabs">
      <template #default="{ activeTab }">
        <div v-if="activeTab === 'tab1'">
          <Weather />
        </div>
        <div v-if="activeTab === 'tab2'">
          <Warning />
        </div>
        <div v-if="activeTab === 'tab3'">
          <Ventusky />
        </div>
      </template>
    </Tabs>

    <div class="actions">
      <div class="action">
        <RouterLink to="/setting">返回主页</RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped>
div {
  display: block;
  unicode-bidi: isolate;
}
.scrollable-container {
  max-height: 700px; /* 根据需要调整最大高度 */
  overflow-y: auto; /* 启用竖向滚动条 */
  padding: 10px; /* 可选：添加内边距 */
  background-color: transparent; /* 可选：设置背景颜色 */
}
.action{
  display: flex; /* 使用 Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 80px; /* */
}
</style>
