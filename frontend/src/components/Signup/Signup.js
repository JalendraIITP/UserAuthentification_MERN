import React, { useContext } from 'react'
import './Signup.css'
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store';
import UseContext from '../../Context/UseContext';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setUser } = useContext(UseContext);
    const [loading, setLoading] = useState();
    const [user, setuser] = useState({
        name: "", email: "", password: ""
    });
    const showToastMessage = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
        });
    };
    const showToastMessageE = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
        });
    };
    const showToastMessageW = (message) => {
        toast.warning(message, {
            position: toast.POSITION.TOP_CENTER,
        });
    };
    const handle = (e) => {
        const newUser = { ...user };
        newUser[e.target.id] = e.target.value;
        setuser(newUser);
    }
    const PostData = async (e) => {
        e.preventDefault();
        const newUser = { ...user };
        try {
            setLoading("Loading");
            const res = await axios.post('https://backend-gaqp.onrender.com/signup', newUser);
            if (res.status > 200) {
                showToastMessageW(res.data.message);
                setLoading(null);
            } else {
                showToastMessage(res.data.message);
                dispatch(authActions.login());
                setUser(res.data.user);
                navigate(`/user/${res.data.user.name.split(" ")[0]}`);
                setLoading(null);
            }
        } catch (error) {
            setLoading(null);
            showToastMessageE("Unable to Signup !");
            console.error('Error during fetching:', error);
        }
    }
    return (
        <>
            <div className='sadv'>
                <p>Signup to Image Gallery</p>
            </div>
            <div className="slogin-page">
                <div className="sform">
                    <form className="slogin-form" onSubmit={PostData} method="post">
                        <input onChange={(e) => handle(e)} type="text" id="name" value={user.name} placeholder='Name' required />
                        <input onChange={(e) => handle(e)} type="email" id="email" value={user.email} placeholder='Email' required />
                        <input onChange={(e) => handle(e)} type="password" id="password" value={user.password} placeholder='Password' required />
                        <button type="submit" onSubmit={PostData}>SignUp</button>
                        <p className="message">Already have an Account? <Link to="/login">LogIn</Link></p>
                    </form>
                    {loading && <div className="sloader-wrapper">
                        <div className="sloader"></div>
                    </div>}
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Signup
