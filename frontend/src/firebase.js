import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  // Konfiguracja Firebase
  apiKey: "AIzaSyAH8HTzBZySfqE46g4xSl1fYUw53iJH1aI",
  authDomain: "program-b68e8.firebaseapp.com",
  projectId: "program-b68e8",
  storageBucket: "program-b68e8.firebasestorage.app",
  messagingSenderId: "211034796198",
  appId: "1:211034796198:web:901eea63d600eb39f08467",
  measurementId: "G-D29L9P9L1Y"
}

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig)

// Inicjalizacja Firestore
const db = getFirestore(app)

// Inicjalizacja Storage
const storage = getStorage(app)

// Inicjalizacja Analytics
const analytics = getAnalytics(app)

export { db, storage, analytics } 