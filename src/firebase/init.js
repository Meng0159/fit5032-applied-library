import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
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
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
