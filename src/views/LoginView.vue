<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          @blur="() => validateLogin(true)"
          @input="() => validateLogin(false)"
        />
        <span v-if="usernameError" class="error">{{ usernameError }}</span>
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          @blur="() => validateLogin(true)"
          @input="() => validateLogin(false)"
        />
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
      </div>
      <button type="submit" @click="handleSubmit">Login</button>
    </form>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'
const isLogin = ref(false)
localStorage.setItem('userState', JSON.stringify(isLogin))
const defaultUsername = 'admin'
const defaultPassword = '1111'
const username = ref('')
const password = ref('')
const usernameError = ref('')
const passwordError = ref('')

const validateLogin = (isBlur) => {
  // Validate username and password
  {
    if (username.value !== defaultUsername) {
      if (isBlur) usernameError.value = 'Please enter your username'
    } else {
      usernameError.value = ''
    }
    if (password.value !== defaultPassword) {
      if (isBlur) passwordError.value = 'Please enter your password'
    } else {
      passwordError.value = ''
    }
  }
}

const handleSubmit = () => {
  validateLogin(true)
  if (!usernameError.value && !passwordError.value) {
    alert('Form submitted successfully')
    isLogin.value = true
    localStorage.setItem('userState', JSON.stringify(isLogin.value))
    console.log(localStorage.getItem('userState'))
    router.push('/')
  } else {
    router.push('/accessDeniedPage')
  }
  clearForm()
}

const clearForm = () => {
  username.value = ''
  password.value = ''
  usernameError.value = ''
  passwordError.value = ''
}
</script>

<style>
.error {
  color: red;
}
</style>
