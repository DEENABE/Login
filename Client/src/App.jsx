import React from 'react'
import Signup from './form/Signup'
import Signin from './form/Signin'
import Home from '../Components/Home'
import { BrowserRouter, Route,Routes } from 'react-router-dom'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
    
    </Routes>
    </BrowserRouter>
  )
}

export default App;