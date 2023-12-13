import React from 'react'
import './Login.css'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: "", password: ""
    });
    const handle = (e) => {
        const newUser = { ...user };
        newUser[e.target.id] = e.target.value;
        setUser(newUser);
    }
    const PostData = async (e) => {
        e.preventDefault();
        const newUser = { ...user };
        try {
            const res = await axios.post('http://localhost:4000/login', newUser);
            if (res.status === 400) {
                console.log(res.data.message);
            } else {
                console.log(res.data.message);
                dispatch(authActions.login());
                navigate('/welcome');
            }
        } catch (error) {
            console.error('Error during fetching:', error);
        }
    }
    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={PostData} method="post">
                    <input onChange={(e) => handle(e)} type="email" id="email" value={user.email} placeholder='Email' />
                    <input onChange={(e) => handle(e)} type="password" id="password" value={user.password} placeholder='Password' />
                    <button type="submit" onSubmit={PostData}>LogIn</button>
                    <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login
