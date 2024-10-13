<template>
  <div class="books-container">
    <h1>All Books</h1>
    <a href="/" class="back-link">Back to home</a>

    <div v-if="loading" class="loading">Loading books...</div>

    <div v-else-if="error" class="error">Error loading books: {{ error }}</div>

    <div v-else>
      <p>Total Books: {{ books.length }}</p>

      <table class="books-table">
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.isbn">
            <td>{{ book.isbn }}</td>
            <td>{{ book.name }}</td>
          </tr>
        </tbody>
      </table>

      <h3>JSON Data:</h3>
      <pre class="json-display">{{ JSON.stringify(books, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GetAllBooksAPI',
  data() {
    return {
      books: [],
      loading: true,
      error: null
    }
  },
  created() {
    this.getAllBooks()
  },
  methods: {
    async getAllBooks() {
      try {
        const response = await axios.get('https://getallbooks-esypciyr4q-uc.a.run.app')
        this.books = response.data
      } catch (error) {
        console.error('Error fetching books:', error)
        this.error = error.message || 'An error occurred while fetching books'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.books-container {
  padding: 20px;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #333;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.loading,
.error {
  padding: 10px;
  margin: 10px 0;
}

.error {
  color: red;
  border: 1px solid red;
  border-radius: 4px;
}

.json-display {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
