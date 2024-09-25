<template>
  <a href="/">Back to home</a>
  <div>
    <!-- Add Book Section -->
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN: </label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name: </label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>

    <!-- Delete Book Section -->
    <h1>Delete Book</h1>
    <form @submit.prevent="deleteBookByISBN">
      <div>
        <label for="deleteIsbn">ISBN: </label>
        <input type="text" v-model="deleteIsbn" id="deleteIsbn" required />
      </div>
      <button type="submit">Delete Book</button>
    </form>

    <!-- Book List Section Listen to the editBook event to update-->
    <h1>Update Book</h1>

    <BookList :books="books" @editBook="updateBook"></BookList>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'
import BookList from '@/components/BookList.vue'

const isbn = ref('')
const name = ref('')
const deleteIsbn = ref('') // Ref for deleting a book by ISBN
const books = ref([])

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }
    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value
    })
    isbn.value = ''
    name.value = ''
    alert('Book added successfully!')
    await fetchBooks() // Refresh book list after adding
  } catch (error) {
    console.error('Error adding book: ', error)
  }
}

const fetchBooks = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000), // Filter: where ISBN > 1000
      orderBy('isbn', 'asc'), // Order: by book name in ascending order
      limit(5)
    ) // Limit: to 10 results)
    const querySnapshot = await getDocs(q)
    books.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching books: ', error)
  }
}

// Function to delete a book by ISBN
const deleteBookByISBN = async () => {
  try {
    const targetBook = books.value.find((book) => book.isbn === Number(deleteIsbn.value))
    if (!targetBook) {
      alert('No book found with the given ISBN')
      return
    }

    await deleteDoc(doc(db, 'books', targetBook.id))
    deleteIsbn.value = ''
    alert('Book deleted successfully!')
    await fetchBooks() // Refresh book list after deletion
  } catch (error) {
    console.error('Error deleting book: ', error)
  }
}
// Update book in Firebase when Save button is clicked
const updateBook = async (editedBook) => {
  try {
    const bookRef = doc(db, 'books', editedBook.id)
    await updateDoc(bookRef, {
      name: editedBook.name,
      isbn: editedBook.isbn
    })
    alert('Book updated successfully!')
    await fetchBooks() // Refresh book list after updating
  } catch (error) {
    console.error('Error updating book: ', error)
  }
}

onMounted(() => {
  fetchBooks()
})
</script>

<style scoped>
.modal-overlay {
  /* existing styles */
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  /* existing styles */
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.modal h2 {
  margin-top: 0;
}

.modal label {
  display: block;
  margin-bottom: 8px;
}

.modal input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
}

.modal button {
  margin-right: 8px;
}
</style>
