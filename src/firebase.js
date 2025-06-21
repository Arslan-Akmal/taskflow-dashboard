// Import Firebase core + services
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAhK-WXCF282ZXjDT5Fmo2Hvfy5JYItwxM',
  authDomain: 'taskflow-83dd3.firebaseapp.com',
  projectId: 'taskflow-83dd3',
  storageBucket: 'taskflow-83dd3.firebasestorage.app',
  messagingSenderId: '522031342617',
  appId: '1:522031342617:web:85cdfbd04e5494e8797688',
  measurementId: 'G-SVJQQXZ93Z',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
