import React from 'react'
import './Advertisement.css'
import ImageSlider from './Slider'

const Advertisement = () => {
    const containerStyles = {
        width: "1520px",
        height: "580px",
        margin: "0 auto",
    };

    return (
        <>
            <div className='adv2'>
                <p>Welcome to Image Gallery</p>
            </div>
            <div style={containerStyles}>
                <ImageSlider />
            </div>
        </>
    );
}

export default Advertisement
