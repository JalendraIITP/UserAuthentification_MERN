import React from 'react'
import './Footer.css'
import instagram_icon from './instagram_icon.png'
import pintester_icon from './pintester_icon.png'
import whatsapp_icon from './whatsapp_icon.png'
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <p>PHOTOS</p>
            </div>
            <ul className='footer-links'>
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={instagram_icon} alt='' />
                </div>
                <div className="footer-icons-container">
                    <img src={pintester_icon} alt='' />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp_icon} alt='' />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ {new Date().getFullYear()} - All Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer
