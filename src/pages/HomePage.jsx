import React from 'react';
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../context/Auth";
import apple from '../assets/brands/apple.svg';
import infinix from '../assets/brands/infinix.jpg';
import lava from '../assets/brands/lava.jpeg';
import mi from '../assets/brands/mi.svg';
import nokia from '../assets/brands/nokia.svg';
import oneplus from '../assets/brands/oneplus.svg';
import oppo from '../assets/brands/oppo.svg';
import realme from '../assets/brands/realme.svg';
import samsung from '../assets/brands/samsung.svg';
import vivo from '../assets/brands/vivo.svg';
import guarantee from '../assets/guarantee.png'
import trust from '../assets/trust.png';

const HomePage = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    return (
        <Layout title={"Home - Google Paradise"}>
            <div className="conhead1 d-flex">
                <div className="d-flex flex-column">
                    <h2 className='conh2'>
                        Top Mobile Brands At Affordable Price
                    </h2>
                    <p className='conp'>
                        At Sri Google Paradise, we bring you the latest smartphones at prices that fit your budget. From high-end devices to affordable options, find everything you need right here!
                    </p>
                    <button onClick={()=> navigate('/product-category')}>View Products</button>
                </div>
                <div className="conheadimg text-center">
                    <img src="https://firebasestorage.googleapis.com/v0/b/sri-9f5c4.appspot.com/o/Apple-iPhone-15-lineup-hero-230912_inline.jpg.large.jpg?alt=media&token=b1821f17-7b57-43e1-a216-21eee81feec5" alt="product"/>
                </div>
            </div>
            <div className="brands d-flex flex-column" data-aos="fade-right" data-aos-duration="1500">
                <h3>All Brands Available</h3>
                <div className="productlogo flex-row flex-wrap" data-aos="fade-right" data-aos-duration="2000"> 
                    <img src={apple} alt="logo" />
                    <img src={samsung} alt="logo" />
                    <img src={infinix} alt="logo" />
                    <img src={oppo} alt="logo" />
                    <img src={vivo} alt="logo" />
                    <img src={nokia} alt="logo" />
                    <img src={lava} alt="logo" />
                    <img src={realme} alt="logo" />
                    <img src={mi} alt="logo" />
                    <img src={oneplus} alt="logo" />
                </div>
            </div>
            <div className="guarantee d-flex flex-column">
                <div className="text-center">
                    <h1 className="guarh1">People's Satisfaction First</h1>
                </div>
                <div className="d-flex flex-row flex-wrap">
                    <div className="textguarant">
                        <img src={guarantee} alt="" />
                        <h4>1 Year Warranty</h4>
                    </div>
                    <div className="textguarant2">
                        <img src={trust} alt="" />
                        <h4>Trusted by over 100+ Customers</h4>
                    </div>
                </div>
            </div>
            <div className='getin'>
                <h1>Get in Touch</h1>
                <p>
                    Have questions? Our customer service team is just a click away to assist you with any inquiries or issues.
                </p>
                <button className='btn' onClick={()=>navigate('/contact')}> Contact </button>
            </div>
        </Layout>
    );
}

export default HomePage;
