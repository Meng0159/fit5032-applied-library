<!-- <script setup>
// import JSON from './components/JSON.vue'
// import RegistrationForm from './components/LibraryRegistrationForm.vue'
</script>
https://Meng0159.github.io/fit5032-applied-library/
Meng0159
/
fit5032-applied-library
<template>
    <router-view></router-view>
  </main>
</template>

<style scoped></style> -->

<template>
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import BHeader from './components/BHeader.vue'
import CountBookAPI from './views/CountBookAPI.vue'

export default {
  name: 'App',
  components: {
    BHeader,
    // eslint-disable-next-line vue/no-unused-components
    CountBookAPI
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookAPI'
    }
  }
}
</script>
