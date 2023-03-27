import React from 'react'
import './NavStyles.css'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { LOGOUT } from "../../redux/const/actionTypes"

const Nav = (props) => {
  const dispatch = useDispatch();
  const [authenticated,
    setAuthenticated] = useState(false)

  useEffect(() => {
    if (props.auth.authData) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  }, [props.auth])

  function handleLogOut(e) {
    e.preventDefault()

    dispatch({ type: LOGOUT })
  }
  return (
    <nav className='mainNav'>
      <div>
        <h3>Julieth AI</h3>
      </div>
      <div>
        {authenticated ?
          <div className='rightSide'>
            <i className="fa fa-user" aria-hidden="true"></i>
            <div>
              <span className='d-block'>Account</span>
              <div className='container2'>
                <Link className='d-block link-btn' to='/account/profile'>Profile</Link> <span className='or'>|</span> <Link onClick={handleLogOut} className='link-btn' to='/'>Logout</Link>
              </div>

            </div>
          </div>
          :
          <div className='rightSide'>
            <i className="fa fa-user" aria-hidden="true"></i>
            <div>
              <span className='d-block'>Account</span>
              <div className='container2'>
                <Link className='d-block link-btn' to='/account/login'>Login</Link> <span className='or'>|</span> <Link className='link-btn' to='account/signup'>Signup</Link>
              </div>

            </div>
          </div>
        }
      </div>
      
      
    </nav>
  )
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(Nav);