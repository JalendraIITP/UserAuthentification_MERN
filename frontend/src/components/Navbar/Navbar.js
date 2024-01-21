import React, { useContext } from 'react'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../Store';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import UseContext from '../../Context/UseContext';
const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const dispatch = useDispatch();
    const { user } = useContext(UseContext);

    const showToastMessage = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    const sendLogout = async () => {
        const res = await axios.post('https://backend-gfyd.onrender.com/logout', null, {
            withCredentials: true
        });
        if (res.status === 200) {
            return res;
        }
        return new Error('Unable to Logout. Please Try again');
    }
    const handleLogout = () => {
        sendLogout()
            .then(() => {
                dispatch(authActions.logout());
                showToastMessage("Successfully Logged Out");
            })
            .then(() => navigate('/'))
            .catch(error => {
                dispatch(authActions.logout());
                console.error('Logout failed:', error);
                navigate('/');
            });
    };
    return (
        <>
            <div className="nav">
                <input type="checkbox" id="nav-check" />
                <div className="nav-header">
                    <div className="nav-title">
                        PHOTOS
                    </div>
                </div>
                <div className="nav-btn">
                    <label htmlFor="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>

                <div className="nav-links">
                    {!isLoggedIn && <a href="/signup">Signup</a>}
                    {!isLoggedIn && <a href="/login">Login</a>}
                    {isLoggedIn && user && (
                        <>
                            <Link to={`/user/${user.name}`}>
                                <abbr className="tooltip tooltip--left" data-tooltip={user.name.split(" ")[0]}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" cursor="pointer" fill="currentColor" className="icons" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                    </svg>
                                </abbr>
                            </Link>
                        </>
                    )}
                    {isLoggedIn && <Link onClick={handleLogout} href="/">Logout</Link>}
                    <Link to="/">Home</Link>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Navbar
