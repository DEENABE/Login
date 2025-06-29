import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
        <h1>Welcome to Home Page</h1>
        <p>Click on the links to navigate</p>
        <Link to="/signin">Signin</Link>
        <br />
        <Link to="/signup">Signup</Link>
        
    </div>
  )
}

export default Home