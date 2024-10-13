<!-- eslint-disable no-unused-vars -->
<template>
  <div>
    <h1>Book List with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        <span v-if="editingBook?.id !== book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button @click="startEditing(book)">Edit</button>
        </span>

        <!-- Editable fields appear when editingBook is the current book -->
        <span v-else>
          <input v-model="editingBook.name" placeholder="Edit name" />
          <input v-model.number="editingBook.isbn" type="number" placeholder="Edit ISBN" />
          <button @click="saveEdit">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  books: Array
})

const emit = defineEmits(['editBook']) // Event to emit edited book

const editingBook = ref(null)

const startEditing = (book) => {
  editingBook.value = { ...book } // Clone book data to avoid directly mutating the prop
}

const saveEdit = () => {
  emit('editBook', editingBook.value) // Emit the updated book to the parent component
  editingBook.value = null // Reset editing state
}

const cancelEdit = () => {
  editingBook.value = null // Cancel editing and close the input fields
}
</script>

<style scoped>
/* Optional styling for the input fields to appear nicely on the right-hand side */
ul {
  list-style-type: none;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input {
  margin-left: 10px;
  padding: 5px;
}
</style>
