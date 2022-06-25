import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyASOqhXbSwAeCAd62YmyWI7NcvtNH9wSnQ',
  authDomain: 'auth-dev-5cce6.firebaseapp.com',
  projectId: 'auth-dev-5cce6',
  storageBucket: 'auth-dev-5cce6.appspot.com',
  messagingSenderId: '795056018837',
  appId: '1:795056018837:web:c1096033a8c4751d1dd29c',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
