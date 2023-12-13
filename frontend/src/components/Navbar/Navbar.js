import React from 'react'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../Store';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const dispatch = useDispatch();
    const sendLogout = async () => {
        const res = await axios.post('http://localhost:4000/logout', null, {
            withCredentials: true
        });
        if (res.status === 200) {
            return res;
        }
        return new Error('Unable to Logout. Please Try again');
    }
    const handleLogout = () => {
        sendLogout().then(() => dispatch(authActions.logout())).then(() => navigate('/'))
    }
    return (
        <div class="nav">
            <input type="checkbox" id="nav-check" />
            <div class="nav-header">
                <div class="nav-title">
                    Tracker
                </div>
            </div>
            <div class="nav-btn">
                <label for="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <div class="nav-links">
                {!isLoggedIn && <Link to="/signup">Signup</Link>}
                {!isLoggedIn && <Link to="/login">Login</Link>}
                {isLoggedIn && <Link onClick={handleLogout} to="/">Logout</Link>}
                <Link to="/welcome">Home</Link>
            </div>
        </div>
    )
}

export default Navbar
