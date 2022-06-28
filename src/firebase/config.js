import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  // apiKey: 'AIzaSyAmqQYY8JKh7GZHtK2tPu8rAPHiaYXBZFY',
  // authDomain: 'auth-dev-eead0.firebaseapp.com',
  // projectId: 'auth-dev-eead0',
  // storageBucket: 'auth-dev-eead0.appspot.com',
  // messagingSenderId: '665049177996',
  // appId: '1:665049177996:web:71ed6616c5df3ed61200a9',
  apiKey: 'AIzaSyArB3rIDlwke-tSgItRZT1jsPOsje-6Z60',
  authDomain: 'flile-upload.firebaseapp.com',
  projectId: 'flile-upload',
  storageBucket: 'flile-upload.appspot.com',
  messagingSenderId: '283807917118',
  appId: '1:283807917118:web:f393a854482fda9bda9d6f',
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
export const auth = getAuth(app)
