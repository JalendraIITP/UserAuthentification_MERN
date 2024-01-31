import React, { useContext } from 'react'
import './Advertisement.css'
import UseContext from '../../Context/UseContext';
import im1 from './1.jpg'
import im2 from './2.jpg'
import im3 from './3.jpg'
import im4 from './4.jpg'
import { Link } from 'react-router-dom';

const Advertisement = () => {
    const { user } = useContext(UseContext);
    return (
        <>
            <div className='adv1'>
                <p>Welcome to Image Gallery</p>
                //{user && <p>Welcome to Image Gallery</p>}
                //{!user && <Link to={`/user/${user.name}`}><p>{user.name}</p><Link/>}
            </div>
            <div className="gallery">
                <img src={im1} alt="Two hands creating a heart and showing the sun" />
                <img src={im2} alt="The mountain" />
                <img src={im3} alt="a river" />
                <img src={im4} alt="a women with a camera" />
            </div>
        </>
    );
}

export default Advertisement
