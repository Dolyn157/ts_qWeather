<script setup lang="ts">
import {computed, inject} from "vue";
const latitude = inject("latitude");
const longitude = inject("longitude");

function round(number, precision) {
  return Math.round(+number + "e" + precision) / Math.pow(10, precision);
  //same as:
  //return Number(Math.round(+number + 'e' + precision) + 'e-' + precision);
}

const position = computed(()=>{
  const lat = round(latitude, 2)
  const lng = round(longitude, 2)
  return `${lat};${lng};`
})
</script>

<template>
  <iframe
    id="inlineFrameExample"
    title="Inline Frame Example"
    width="600"
    height="400"
    :src="`https://www.ventusky.com/?p=${position}8&l=temperature-2m`">
  </iframe>
</template>

<style scoped>

</style>
