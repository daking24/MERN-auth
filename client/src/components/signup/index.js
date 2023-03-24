import React from 'react'
import { Link } from 'react-router-dom'
import './SignupStyles.css'

const Signup = () => {
  return (
    <div className='signupContainer'>
      <div className='signupContainer2'>
        <h2>Create your account</h2>
        <div className='inputsContainer'>
          <label>NAME</label>
          <input placeholder='Enter name' type='email' />
        </div>
        <div className='inputsContainer'>
          <label>EMAIL</label>
          <input placeholder='Enter email' type='email' />
        </div>
        <div className='inputsContainer'>
          <label>PASSWORD</label>
          <input placeholder='Enter password' type='password' />
        </div>
        <div className='inputsContainer'>
          <label>CONFIRM PASSWORD</label>
          <input placeholder='Enter password again' type='password' />
        </div>
        <button className='signup-btn'>Register</button>
        <span className='su-or'>OR</span>
        <button className='sign-google-btn'>
          <i class="fa fa-google" aria-hidden="true"></i>
          Sign Up with Google</button>
        <span className='notreg'>Already have account? <Link className='sign-link' to='/account/login'>Log In</Link></span>
      </div>
    </div>
  )
}

export default Signup