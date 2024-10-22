<template>
  <div class="tabs">
    <div class="tab-titles">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        :class="['tab-title', { active: activeTab === tab.name }]"
        @click="setActiveTab(tab)"
      >
        {{ tab.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { activeTab } from '../../main'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
});

let setActiveTab = (tab) => {
  activeTab.value = tab.name
  //localStorage.setItem('activeTab', activeTab.value)
}

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
</style>
