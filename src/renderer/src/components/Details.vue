<script setup lang="ts">
import {onBeforeMount, ref} from 'vue'
import Warning from "@renderer/components/Warning.vue";

</script>

<template>
  <div class="box, scrollable-container">
  <Warning />
    <div class="actions">
      <div class="action">
        <RouterLink to="/setting">返回主页</RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped>

.scrollable-container {
  max-height: 1000px; /* 根据需要调整最大高度 */
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
