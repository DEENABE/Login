import React from 'react'
import Signup from './form/Signup'
import Signin from './form/Signin'
import Home from '../Components/Home'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import ProtectRouter from '../protectRouter/ProtectRouter'
import ForgotPassword from '../Password/ForgotPassword'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectRouter><Home/></ProtectRouter>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/forgotpassword" element={<ForgotPassword/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App