<template>
  <div class="tabs">
    <div class="tab-titles">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        :class="['tab-title', { active: activeTab === tab.name }]"
        @click="activeTab = tab.name"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="tab-content">
      <KeepAlive>
        <slot :active-tab="activeTab" />

      </KeepAlive>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
});

const activeTab = ref(props.tabs[0].name); // Set default active tab
</script>

<style scoped>
.tabs {
  border: 1px solid #ccc;
}
.tab-titles {
  display: flex;
  border-bottom: 1px solid #ccc;
}
.tab-title {
  padding: 10px 20px;
  cursor: pointer;
}
.tab-title.active {
  font-weight: bold;
  border-bottom: 2px solid blue;
}
.tab-content {
  padding: 20px;
}
</style>
