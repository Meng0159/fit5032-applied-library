<template>
  <header>
    <BHeader />
  </header>
  <div>
    <LibraryRegistrationForm />
  </div>
</template>

<script>
import LibraryRegistrationForm from '@/components/LibraryRegistrationForm.vue'
import BHeader from '@/components/BHeader.vue'

export default {
  name: 'HomeView',
  components: {
    BHeader,
    LibraryRegistrationForm
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
