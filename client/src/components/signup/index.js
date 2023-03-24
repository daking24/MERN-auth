import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignupStyles.css'

import {useGoogleLogin} from '@react-oauth/google'
import {useDispatch} from 'react-redux'
import {signup, signupGoogle} from '../../redux/actions/auth'

const InitState = {
  name: "",
  email: '',
  password: '',
  confirmPassword: '',
}

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [sForm, setsForm] = useState(InitState)

  const handleChange = (e) => setsForm({
    ...sForm,
    [e.target.name]: e.target.value
  })

  function handleGoogleLoginSuccess(tokenResponse) {

    const accessToken = tokenResponse.access_token;

    dispatch(signupGoogle(accessToken, navigate))
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (sForm.name !== "" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" && sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {
      dispatch(signup(sForm, navigate))
    }
  }

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  return (
    <div className='signupContainer'>
      <div className='signupContainer2'>
        <h2>Create your account</h2>
        <div className='inputsContainer'>
          <label>NAME</label>
          <input onChange={handleChange} placeholder='Enter name' type='text' />
        </div>
        <div className='inputsContainer'>
          <label>EMAIL</label>
          <input onChange={handleChange} placeholder='Enter email' type='email' />
        </div>
        <div className='inputsContainer'>
          <label>PASSWORD</label>
          <input onChange={handleChange} placeholder='Enter password' type='password' />
        </div>
        <div className='inputsContainer'>
          <label>CONFIRM PASSWORD</label>
          <input onChange={handleChange} placeholder='Enter password again' type='password' />
        </div>
        <button onClick={handleOnSubmit} className='signup-btn'>Register</button>
        <span className='su-or'>OR</span>
        <button onClick={() => login()} className='sign-google-btn'>
          <i class="fa fa-google" aria-hidden="true"></i>
          Sign Up with Google</button>
        <span className='notreg'>Already have account? <Link className='sign-link' to='/account/login'>Log In</Link></span>
      </div>
    </div>
  )
}

export default Signup