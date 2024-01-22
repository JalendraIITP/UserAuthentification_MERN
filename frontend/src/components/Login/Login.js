import React, { useState, useContext } from 'react'
import axios from 'axios'
import './Login.css'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store';
import UseContext from '../../Context/UseContext';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setUser } = useContext(UseContext);
    const [loading, setLoading] = useState();
    const [user, setuser] = useState({
        email: "", password: ""
    });
    const showToastMessage = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
        });
    };
    const showToastMessageW = (message) => {
        toast.warning(message, {
            position: toast.POSITION.TOP_CENTER,
        });
    };
    const showToastMessageE = (message) => {
        toast.error(message, {
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
            const res = await axios.post('https://backend-gaqp.onrender.com/login', newUser);
            if (res.status === 200) {
                showToastMessage(res.data.message);
                dispatch(authActions.login());
                setUser(res.data.user);
                navigate(`/user/${res.data.user.name.split(" ")[0]}`);
            } else {
                showToastMessageW(res.data.message);
            }
            setLoading(null);
        } catch (error) {
            setLoading(null);
            showToastMessageE("Error during fetching !");
            console.error('Error during fetching :', error);
        }
    }

    return (
        <>
            <div className='ladv'>
                <p>Login to Image Gallery</p>
            </div>
            <div className="llogin-page">
                <div className="lform">
                    <form className="llogin-form" onSubmit={PostData} method="post">
                        <input onChange={(e) => handle(e)} type="email" id="email" value={user.email} placeholder='Email' />
                        <input onChange={(e) => handle(e)} type="password" id="password" value={user.password} placeholder='Password' />
                        <button type="submit" onSubmit={PostData}>LogIn</button>
                        <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
                    </form>
                    {loading && <div className="lloader-wrapper">
                        <div className="lloader"></div>
                    </div>}
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login
