import React from 'react'
import './NavStyles.css'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='mainNav'>
      <div>
        <h3>Julieth AI</h3>
      </div>
      <div className='rightSide'>
        <i class="fa fa-user" aria-hidden="true"></i>
        <div>
          <span className='d-block'>Account</span>
          <div className='container2'>
            <Link className='d-block link-btn' to='/account/login'>Login</Link> <span className='or'>|</span> <Link className='link-btn' to='account/signup'>Signup</Link>
          </div>
          
        </div>
      </div>
    </nav>
  )
}

export default Nav