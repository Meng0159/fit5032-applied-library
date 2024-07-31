<script setup>
// eslint-disable-next-line no-unused-vars
import welcomeSection from './components/welcomeSection.vue'
// eslint-disable-next-line no-unused-vars
import TheWelcome from './components/TheWelcome.vue'
import JSON from './components/JSON.vue'
</script>

<template>
  <JSON></JSON>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <welcomeSection msg="You did it!" username="Eloi" />
    </div>
  </header>

  <main>
    <JSON />
  </main> -->
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
