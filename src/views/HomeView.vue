<template>
  <header>
    <BHeader />
  </header>
  <Toast />
  <div v-if="isAuthenticated == true">
    <Welcome />
    <button type="button" class="btn btn-primary" @click="showRole('Welcome Back!')">
      Show Role
    </button>
    <LibraryRegistrationForm />
  </div>
  <!-- If user is not authenticated, then we force them to see the LoginView -->
  <!-- Note the use of @authenticated to handle child -> parent communication between LoginView nad App.vue components. -->
  <div v-else>
    <LoginView @authenticated="handleAuthentication" />
  </div>
</template>

<script setup>
import Welcome from '@/components/Welcome.vue'
import LibraryRegistrationForm from '@/components/LibraryForm.vue'
import BHeader from '@/components/BHeader.vue'

import LoginView from './LoginView.vue'
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
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
    const db = getFirestore()
    const userDoc = await getDoc(doc(db, 'users', user.uid))

    if (userDoc.exists()) {
      const userData = userDoc.data()
      role.value = userData.role

      toast.add({
        severity: 'info',
        summary: `Role: ${role.value}`,
        detail: 'This is your current role in the system.',
        life: 3000
      })
    } else {
      error.value = 'User document not found'
      console.log(error.value)
    }
  } catch (err) {
    error.value = `Error fetching role: ${err.message}`
    console.error(error.value)
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
/* Add your custom styles here */
</style>
