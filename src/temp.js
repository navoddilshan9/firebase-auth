import { useState } from 'react'
import * as yup from 'yup'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage'
import { userSchema } from './validation/userValidation'
import { auth } from './firebase/config'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { storage } from './firebase/config'
import './App.css'

function App() {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [resetEmail, setResetEmail] = useState(null)
  const [isForget, setIsforget] = useState(false)
  const [user, setUser] = useState({})
  const [pogress, setPogress] = useState(0)
  const [image, setImage] = useState('')
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser)
  // })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  })
  const submitForm = async (data) => {
    console.log(data.email)
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      console.log(user)
      alert('Signup successfully')
    } catch (error) {
      console.log(error.message)
      alert('Error')
    }
  }
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)

      alert('loggedin')
    } catch (error) {
      console.log(error)
      alert('Error')
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
          alert('Error')
        })
    }
  }
  const handlieChnage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
    console.log(e.target.files[0])
  }
  const fileUpload = (e) => {
    e.preventDefault()
    const storageRef = ref(storage, `files/` + image.name)
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        console.log(snapshot)
        getDownloadURL(storageRef)
          .then((url) => {
            console.log(url)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className='App'>
      <form onSubmit={handleSubmit(submitForm)}>
        <h3> Register User </h3>
        <input
          placeholder='Email...'
          {...register('email', {
            required: 'Required',
          })}
          name='email'
        />
        <br />
        <p> {errors.email && errors.email?.message}</p>
        <input
          placeholder='Password...'
          {...register('password', {
            required: 'Required',
          })}
          name='password'
        />
        <p> {errors.password && errors.password?.message}</p>
        <button type='submit'> Create User</button>
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
        {/* <p> {errors.email?.message} </p> */}
        <input
          placeholder='Password...'
          name='password'
          onChange={(event) => {
            setLoginPassword(event.target.value)
          }}
        />
        {/* <p> {errors.password?.message} </p> */}
        <button onClick={login}> Login</button>
      </div>
      <form onSubmit={fileUpload} name='form1'>
        <input
          placeholder='image...'
          name='uploadBox'
          type='file'
          onChange={handlieChnage}
        />
        {/* <h3>Progress {pogress}%</h3> */}
        <button type='submit'> upload</button>
      </form>
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
