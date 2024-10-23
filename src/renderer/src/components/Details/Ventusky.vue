<script setup lang="ts">
import { computed,  ref } from 'vue'
import { Latitude, Longitude } from '@renderer/main'



function round(number: number, precision: number) {
  if (isNaN(number)) {
    throw new Error('Invalid input: Please provide a valid number.')
  }

  return number.toFixed(precision)
  //same as:
  //return Number(Math.round(+number + 'e' + precision) + 'e-' + precision);
}

const position = computed(() => {
  const lat = round(Latitude.value, 2)
  const lng = round(Longitude.value, 2)
  return `${lat};${lng};`
})
</script>

<template>
  <div class="flexDiv">
    <iframe
      id="inlineFrameExample"
      title="Inline Frame Example"
      width="600"
      height="400"
      :src="`https://www.ventusky.com/?p=${position}8&l=temperature-2m`"
    >
    </iframe>
  </div>
</template>

<style scoped>
.flexDiv {
  margin-top: 3em;
  display: flex;
  justify-content: center;
}
</style>
