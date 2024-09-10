// import './assets/main.css'
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAuth, connectAuthEmulator } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// if (import.meta.env.MODE === 'development') {
//   connectAuthEmulator(getAuth(), 'http://localhost:9099'), { disableWarnings: true }
// }
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAZjapMMiAYw6IEGKyTxqvJ_CB6ArURiLg',
  authDomain: 'week7-meng.firebaseapp.com',
  projectId: 'week7-meng',
  storageBucket: 'week7-meng.appspot.com',
  messagingSenderId: '131447863877',
  appId: '1:131447863877:web:883ec606ea99cca955812c'
}

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
