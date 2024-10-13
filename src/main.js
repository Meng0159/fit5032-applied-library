// import './assets/main.css'
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need

// import { getAuth, connectAuthEmulator } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// if (import.meta.env.MODE === 'development') {
//   connectAuthEmulator(getAuth(), 'http://localhost:9099'), { disableWarnings: true }
// }

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB3-TZCfRsv2wmwRIblq6HMoOkqFfsH7ck',
  authDomain: 'week7-8-meng.firebaseapp.com',
  projectId: 'week7-8-meng',
  storageBucket: 'week7-8-meng.appspot.com',
  messagingSenderId: '664170138434',
  appId: '1:664170138434:web:196bb735bab1456e1496db'
}

// Initialize Firebase
initializeApp(firebaseConfig)
app.mount('#app')
