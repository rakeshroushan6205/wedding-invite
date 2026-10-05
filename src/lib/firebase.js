import { getAnalytics, isSupported } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCw-H1c9MfGKpjKdj4MHalgSezecJUCkY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'wedding-website-9f445.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'wedding-website-9f445',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'wedding-website-9f445.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '308385199674',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:308385199674:web:4bd7962e605d2c817e6703',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-0KP8GNQ27R',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) getAnalytics(app)
    })
    .catch(() => {})
}
