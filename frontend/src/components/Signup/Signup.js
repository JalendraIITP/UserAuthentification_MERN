import React from 'react'
import './Signup.css'
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store';
const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", password: ""
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
            const res = await axios.post('http://localhost:4000/signup', newUser);
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
                    <input onChange={(e) => handle(e)} type="text" id="name" value={user.name} placeholder='Name' required />
                    <input onChange={(e) => handle(e)} type="email" id="email" value={user.email} placeholder='Email' required />
                    <input onChange={(e) => handle(e)} type="password" id="password" value={user.password} placeholder='Password' required />
                    <button type="submit" onSubmit={PostData}>LogIn</button>
                    <p className="message">Already have an Account? <Link to="/login">LogIn</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup
