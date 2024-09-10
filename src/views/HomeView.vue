<template>
  <header>
    <BHeader />
  </header>
  <Toast />
  <div v-if="isAuthenticated == true">
    <div class="welcome-section">
      <h1>Welcome to the Library</h1>
      <Welcome />
    </div>

    <div class="text-center">
      <button @click="fetchAndShowRole">Refresh Role</button>
      <p v-if="role">Your role is: {{ role }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
    <LibraryRegistrationForm />
  </div>
  <!-- If user is not authenticated, then we force them to see the LoginView -->
  <!-- Note the use of @authenticated to handle child -> parent communication between LoginView nad App.vue components. -->
  <div v-else>
    <FirebaseSigninView @authenticated="handleAuthentication" />
  </div>
</template>

<script setup>
import Welcome from '@/components/Welcome.vue'
import LibraryRegistrationForm from '@/components/LibraryForm.vue'
import BHeader from '@/components/BHeader.vue'
import FirebaseSigninView from './FirebaseSigninView.vue'
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'

const role = ref(null)
const error = ref(null)

const fetchAndShowRole = async () => {
  const auth = getAuth()
  const user = auth.currentUser

  if (!user) {
    error.value = 'No user is signed in.'
    console.log(error.value)
    return
  }

  try {
    const email = user.email
    const isAdmin = email.includes('admin')
    console.log(`Is admin: ${isAdmin}`)
    role.value = isAdmin ? 'admin' : 'user'
  } catch (e) {
    error.value = e.message
    console.error(e)
  }
}

// Optionally, you can fetch the role when the component mounts
onMounted(() => {
  fetchAndShowRole()
})
/**
 * The current authentication status of the user.
 * Resets to false at the start (every time page is reloaded)
 */
const isAuthenticated = ref(false)

const handleAuthentication = (value) => {
  isAuthenticated.value = value
}
</script>

<style scoped>
.welcome-section {
  margin: 10px;
  padding: 10px;
  padding-bottom: 40px;
}
</style>
