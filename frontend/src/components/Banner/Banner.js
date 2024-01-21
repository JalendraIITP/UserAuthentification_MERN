import React from 'react'
import './Banner.css'
const Banner = (props) => {
    return (
        <div className='div1'>
            <p>{props.message}</p>
        </div>
    )
}

export default Banner
