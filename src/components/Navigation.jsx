import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import '../stylesheets/navbar.css';
import  logo from '../assets/logo/logo.png';
import Home from './Home';
import Contactus from './Contact';
import ProductCatalog from './ProductCatalog';
import About from './About';



export default function Navigation(){
    return(
        <>
            <nav>
                <div className='logo'>
                    <img src={logo} alt="logo" />
                    <h3>Sri Google Paradise</h3>
                </div>
                <div className='navLink'>
                    <ul>
                        <li><Link to="/"  element={<Home/>}>Home</Link> </li>
                        <li><Link to="/products"  element={<ProductCatalog/>}>Product Catalogue</Link></li>
                        <li><Link to="/contact"  element={<Contact/>}>Contact</Link></li>
                        <li><Link to="/about" element={<About/>}>About</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}