import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from './firebase/config'
import './App.css'

function App() {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [resetEmail, setResetEmail] = useState(null)
  const [isForget, setIsforget] = useState(false)
  const [user, setUser] = useState({})

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser)
  // })
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
      console.log(user)
      alert('loggedin')
    } catch (error) {
      console.log(error)
    }
  }
  const logout = async () => {
    await signOut(auth)
  }

  const forgetPassord = async () => {
    setIsforget(true)
    if (resetEmail != null) {
      sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
          alert('email is sent to your email')
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorMessage)
        })
    }

    console.log(resetEmail)
  }
  return (
    <div className='App'>
      <div>
        <h3> Register User </h3>
        <input
          placeholder='Email...'
          onChange={(event) => {
            setRegisterEmail(event.target.value)
          }}
        />
        <input
          placeholder='Password...'
          onChange={(event) => {
            setRegisterPassword(event.target.value)
          }}
        />

        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder='Email...'
          onChange={(event) => {
            setLoginEmail(event.target.value)
          }}
        />
        <input
          placeholder='Password...'
          onChange={(event) => {
            setLoginPassword(event.target.value)
          }}
        />

        <button onClick={login}> Login</button>
      </div>

      <h4> User Logged In: </h4>
      {user?.email}

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
