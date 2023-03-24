import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginStyles.css'

import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signinGoogle, signin } from "../../redux/actions/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()


  function handleGoogleLoginSuccess(tokenResponse) {

    const accessToken = tokenResponse.access_token;

    dispatch(signinGoogle(accessToken, navigate))
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  function handleSubmit(e) {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(signin({ email, password }, navigate))
    }

  }
  return (
    <div className='loginContainer'>
    <div className='loginContainer2'>
      <h2>Hello there</h2>
      <div className='inputContainer'>
        <label>EMAIL</label>
          <input onChange={e => setEmail(e.target.value)} placeholder='Enter email' type='email'/>
      </div>
      <div className='inputContainer'>
        <label>PASSWORD</label>
          <input onChange={e => setPassword(e.target.value)} placeholder='Enter password' type='password' />
      </div>

        <button onClick={handleSubmit} className='login-btn'>Log In</button>
      <span className='lg-or'>OR</span>
        <button onClick={() => login()} className='google-btn'>
          <i class="fa fa-google" aria-hidden="true"></i>
           Sign In with Google</button>
        <span className='notreg'>Not registered? <Link className='sign-link' to='/account/signup'>SignUp</Link></span>
    </div>
    </div>
  )
}

export default Login