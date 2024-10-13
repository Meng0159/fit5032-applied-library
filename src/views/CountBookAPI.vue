<template>
  <!-- <h1>Book Count</h1>
    <p v-if="loading">Loading...</p>
    <p v-else>{{ bookCount }}</p> -->
  <a href="/">Back to home</a>
  <pre>{{ jsondata }}</pre>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      jsondata: null,
      error: true
    }
  },
  created() {
    this.getBookCountAPI()
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://countbooks-esypciyr4q-uc.a.run.app')
        this.jsondata = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching book count:', error)
        this.error = error
        this.count = null
      }
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
