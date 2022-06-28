import { useState } from 'react'
import * as yup from 'yup'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'

import { auth } from './firebase/config'
import { useForm } from 'react-hook-form'

import './App.css'

function App() {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [resetEmail, setResetEmail] = useState(null)
  const [isForget, setIsforget] = useState(false)

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser)
  // })

  const register = async (e) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then(() => {
        alert('user registered')
      })
      .catch((error) => {
        alert(error)
      })
  }
  const login = async (e) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(() => {
        alert('loggedin')
      })
      .catch((error) => {
        alert(error)
      })
  }
  const logout = async (e) => {
    e.preventDefault()
    await signOut(auth)
      .then(() => {
        alert('signout')
      })
      .catch((error) => {
        alert(error)
      })
  }

  const forgetPassord = async () => {
    setIsforget(true)
    if (resetEmail != null) {
      sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
          alert('email is sent to your email')
        })
        .catch((error) => {
          alert('Error')
        })
    }
  }

  return (
    <div className='App'>
      <form>
        <h3> Register User </h3>
        <input
          placeholder='Email...'
          name='email'
          onChange={(event) => {
            setRegisterEmail(event.target.value)
          }}
        />
        <br />
        <input
          placeholder='Password...'
          name='password'
          onChange={(event) => {
            setRegisterPassword(event.target.value)
          }}
        />
        <button onClick={register}> Create User</button>
      </form>
      <div>
        <h3> Login </h3>
        <input
          placeholder='Email...'
          name='email'
          onChange={(event) => {
            setLoginEmail(event.target.value)
          }}
        />
        <input
          placeholder='Password...'
          name='password'
          onChange={(event) => {
            setLoginPassword(event.target.value)
          }}
        />

        <button onClick={login}> Login</button>
      </div>

      <button onClick={logout}> Sign Out </button>
      <div>
        <h3> reset Password </h3>
        {isForget ? (
          <>
            <input
              placeholder='Email to rest...'
              onChange={(event) => {
                setResetEmail(event.target.value)
              }}
            />
          </>
        ) : (
          <></>
        )}

        <button onClick={forgetPassord}>Froget password </button>
      </div>
    </div>
  )
}

export default App
