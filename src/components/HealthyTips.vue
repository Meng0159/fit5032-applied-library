<script setup>
import { ref } from 'vue'
let areTipsVisible = ref(true)
/**
 * Use v-if to only show Header if it is a completed beginner
 * Use v-for to display tips from a list
 * putting it all together to only show all tips
 */
</script>

<template>
  <div class="tips" v-if="areTipsVisible"></div>
  <p>Healthy</p>
</template>

<style scoped></style>
