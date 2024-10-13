<template>
  <div class="login-box text-center">
    <h1>Sign in</h1>
    <h5>Create an Account</h5>
    <p><input type="text" placeholder="Email" v-model="userEmail" /></p>
    <p><input type="password" placeholder="Password" v-model="userPassword" /></p>
    <p><button @click="firebaseLogin">Sign in via Firebase</button></p>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
const userEmail = ref('')
const userPassword = ref('')
const router = useRouter()
const auth = getAuth()

/**
 * Emits an event to the parent component to indicate that the user has been authenticated.
 */
const emit = defineEmits(['authenticated'])

// eslint-disable-next-line no-unused-vars
const firebaseLogin = (event) => {
  signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then((userCredential) => {
      console.log('Firebase Signin Successful!')
      // Signed in
      const user = userCredential.user
      console.log('User login success:', user)
      localStorage.setItem('userLoginState', JSON.stringify(true))
      localStorage.setItem('userEmail', userEmail.value)
      router.push('/')
      emit('authenticated', true)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
      console.log(userEmail.value, userPassword.value)
    })
}

onMounted(() => {
  if (localStorage.getItem('isLoggedIn')) {
    emit('authenticated', true)
  }
})
</script>

<style scoped>
.login-box {
  max-width: 360px;
  margin: auto;
  padding: 15px;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  display: block;
  margin: 0 auto 20px;
}
</style>
