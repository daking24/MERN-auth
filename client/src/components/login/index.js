import React from 'react'
import { Link } from 'react-router-dom'
import './LoginStyles.css'

const Login = () => {
  return (
    <div className='loginContainer'>
    <div className='loginContainer2'>
      <h2>Hello there</h2>
      <div className='inputContainer'>
        <label>EMAIL</label>
        <input placeholder='Enter email' type='email'/>
      </div>
      <div className='inputContainer'>
        <label>PASSWORD</label>
        <input placeholder='Enter password' type='password' />
      </div>

      <button className='login-btn'>Log In</button>
      <span className='lg-or'>OR</span>
      <button className='google-btn'>
          <i class="fa fa-google" aria-hidden="true"></i>
           Sign In with Google</button>
        <span className='notreg'>Not registered? <Link className='sign-link' to='/account/signup'>SignUp</Link></span>
    </div>
    </div>
  )
}

export default Login