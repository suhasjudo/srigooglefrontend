import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="footer" >
            <h4 className='text-center'>All Right Reserved &copy; Sri Google Paradise</h4>
            <p className='text-center mt-3'>
                <Link to='/'>Home</Link>
                <Link to='/about'>About Us</Link>
                <Link to='/contact'>Contact</Link>
                <Link to='/product-category'>Product Catalogue</Link>
            </p>
        </div>
    );
}

export default Footer;
