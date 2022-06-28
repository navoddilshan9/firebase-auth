import { confirmPasswordReset } from 'firebase/auth'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { auth } from '../firebase/config'

const ResetPass = () => {
  const [newPassword, setNewPassword] = useState()
  const [searchedParams, setSearchedparams] = useSearchParams()

  const resetPassword = () => {
    let oobCode = searchedParams.get('oobCode')
    console.log(oobCode)
    console.log(newPassword)
  }
  return (
    <div className='App'>
      <h3>asd</h3>
      <input
        type='text'
        onChange={(event) => {
          setNewPassword(event.target.value)
        }}
      />
      <button onClick={resetPassword}>reset</button>
      {/* <Forms /> */}
    </div>
  )
}

export default ResetPass
