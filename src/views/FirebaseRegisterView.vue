<template>
  <div class="register-box text-center">
    <h1>Register</h1>
    <h5>Create an Account</h5>
    <div class="mb-3">
      <label for="useremail" class="form-label">Email</label>
      <input type="text" class="form-control" id="useremail" v-model="email" />
      <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="password" />
      <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
    </div>

    <div class="mb-3">
      <label for="confirm-password" class="form-label">Confirm password</label>
      <input
        type="password"
        class="form-control"
        id="confirm-password"
        v-model="confirmPassword"
        @blur="() => validateConfirmPassword(true)"
      />
    </div>
    <div class="mb-3">
      <label for="role" class="form-label">Role</label>
      <select class="form-select" id="role" v-model="role">
        <option value="role-1">role-1</option>
        <option value="role-2">role-2</option>
      </select>
    </div>
    <p><button @click="register">Save to Firebase</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('')
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    // Store user role in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: email.value,
      role: role.value
    })

    console.log('Firebase Register Successful!')
    router.push('/FireLogin')
  } catch (error) {
    console.log(error.code)
  }
}

const errors = ref({
  email: null,
  password: null,
  confirmPassword: null
})
const validateConfirmPassword = (blur) => {
  if (password.value !== confirmPassword.value) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}
</script>

<style scoped>
.register-box {
  max-width: 360px;
  margin: auto;
  padding: 15px;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.register-container {
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
