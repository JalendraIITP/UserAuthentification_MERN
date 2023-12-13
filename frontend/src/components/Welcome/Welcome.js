import React, { useEffect, useState } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true;
let firstRender = true;
const Welcome = () => {
    const [user, setUser] = useState();
    const sendRequest = async () => {
        const res = await axios.get('http://localhost:4000/welcome', {
            withCredentials: true
        }).catch(err => console.log(err));

        const data = await res.data;
        return data;
    }
    const refreshToken = async () => {
        const res = await axios.get('http://localhost:4000/refresh', {
            withCredentials: true
        }).catch((err) => {
            console.log(err);
            return null;
        });

        const data = await res.data;
        return data;
    };
    useEffect(() => {
        if (firstRender) {
            firstRender = false;
            sendRequest().then((data) => setUser(data.user));
        } else {
            let interval = setInterval(() => {
                refreshToken().then(data => setUser(data.user));
            }, 1000 * 29);
            return () => clearInterval(interval);
        }
    }, []);

    return (
        <div>
            {user && <h1>Hello {user.name}</h1>}
            {!user && <h1>Token has Expired</h1>}
        </div>
    )
}

export default Welcome
