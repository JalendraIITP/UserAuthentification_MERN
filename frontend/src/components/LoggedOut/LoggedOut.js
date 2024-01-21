import React from 'react'
import icon from './logout.png'
import './LoggedOut.css';
import { Link } from 'react-router-dom';
const LoggedOut = () => {

    return (
        <>
            <div className="loggedout">
                <div className='box'>
                    <img src={icon} alt=''></img>
                    <h1>You are Logged Out !</h1>
                    <p>Thank You for using GALLERY</p>
                    <Link to={'/login'} ><button>Sign In</button></Link>
                </div>
            </div>
        </>
    )
}

export default LoggedOut
