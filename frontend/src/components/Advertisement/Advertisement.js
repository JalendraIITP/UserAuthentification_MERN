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
                {user && <Link to={`/user/${user.name}`}><button><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                </svg></button></Link>}
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
