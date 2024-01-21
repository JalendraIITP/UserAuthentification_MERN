import React, { useEffect, useContext } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../Store';
import PhotoDisplay from '../PhotoDisplay/PhotoDisplay';
import { useNavigate } from 'react-router-dom';
import UseContext from '../../Context/UseContext';
import Banner from '../Banner/Banner';
import AddItem from '../AddItem/AddItem';
let taskSchedule = true;
axios.defaults.withCredentials = true;

const Home = () => {
    const isBlur = useSelector(state => state.isBlur);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const { user, setUser } = useContext(UseContext);
    const sendRequest = async () => {
        try {
            const res = await axios.get('http://localhost:4000/getuser', {
                withCredentials: true,
            });

            if (res && res.data) {
                return res.data;
            } else {
                return null;
            }
        } catch (err) {
            console.error('Error fetching initial data:', err);
            return null;
        }
    };

    const refreshToken = async () => {
        try {
            const res = await axios.get('http://localhost:4000/refresh', {
                withCredentials: true,
            });

            if (res && res.data) {
                return res.data;
            } else {
                return null;
            }
        } catch (err) {
            console.error('Error refreshing token:', err);
            return null;
        }
    };
    useEffect(() => {
        if (taskSchedule) {
            taskSchedule = false;
            sendRequest().then((data) => {
                if (data) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            });
        } else if (user) {
            let interval = setInterval(async () => {
                try {
                    const result = await refreshToken();

                    if (result) {
                        setUser(result.user);
                    } else {
                        throw new Error('Data is falsy.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setUser(null);
                }
            }, 1000 * 29);
            return () => clearInterval(interval);
        }
    });
    useEffect(() => {
        if (!user || !isLoggedIn) {
            dispatch(authActions.logout());
            navigate('/user/out');
            setUser(null);
        }
    }, [user, isLoggedIn, setUser, dispatch, navigate]);

    return (
        <>
            {user && isLoggedIn && (
                <>
                    <Banner message={user.name + " - Your Gallery"} />
                    <PhotoDisplay />
                    {!isBlur && <AddItem />}
                </>
            )}
        </>
    );
}

export default Home
