import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyAmqQYY8JKh7GZHtK2tPu8rAPHiaYXBZFY',
  authDomain: 'auth-dev-eead0.firebaseapp.com',
  projectId: 'auth-dev-eead0',
  storageBucket: 'auth-dev-eead0.appspot.com',
  messagingSenderId: '665049177996',
  appId: '1:665049177996:web:71ed6616c5df3ed61200a9',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
