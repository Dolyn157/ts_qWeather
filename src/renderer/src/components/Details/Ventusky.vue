<script setup lang="ts">
import {computed, inject} from "vue";
import {Latitude, Longitude} from '@renderer/main'

function round(number: number, precision: number) {
  if (isNaN(number)) {
    throw new Error('Invalid input: Please provide a valid number.');
  }
  return number.toFixed(precision)
  //same as:
  //return Number(Math.round(+number + 'e' + precision) + 'e-' + precision);
}

const position = computed(() => {
  const lat = round(Latitude, 2)
  const lng = round(Longitude, 2)
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
