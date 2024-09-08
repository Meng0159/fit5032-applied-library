<template>
  <div class="login-box text-center">
    <h1>Sign in</h1>
    <h5>Create an Account</h5>
    <p><input type="text" placeholder="Email" v-model="userEmail" /></p>
    <p><input type="password" placeholder="Password" v-model="userPassword" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
const userEmail = ref('')
const userPassword = ref('')
const router = useRouter()
const auth = getAuth()

const signin = () => {
  signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then((data) => {
      console.log('Firebase Signin Successful!')
      router.push('/')
      console.log(data)
    })
    .catch((error) => {
      console.log(error.code)
    })
}

/**
 * Emits an event to the parent component to indicate that the user has been authenticated.
 */
const emit = defineEmits(['authenticated'])

const firebaseLoginuser = (event) => {
  event.preventDefault()
  userEmail.value = event.target.email.value
  userPassword.value = event.target.password.value
  signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log('User login success:', user)

      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('userEmail', userEmail.value)

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
