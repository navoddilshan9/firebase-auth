import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import ResetPassword from './components/resetPass'
import History from './components/History'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/reset' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
