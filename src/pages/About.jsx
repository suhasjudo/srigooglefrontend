import React from 'react';
import Layout from '../components/Layout/Layout';
import about from '../stylesheets/About.module.css';
import entrance from '../assets/About/Mainabout.jpg'
import show from '../assets/About/About.jpg'
import qr from '../assets/frame.png'

const About = () => {
    return (
    <Layout title={"About us - Google Paradise"}>
        <div className={about.head}>
                <h1  data-aos="zoom-in" data-aos-duration="2000">About Us</h1>
                <h4>Welcome to Sri Google Paradise, Your Trusted Partner in the World of Mobile Retail</h4>
                <div className={about.idea} data-aos="fade-right" data-aos-duration="1000">
                        <div className={about.imgcard} >
                        <img src={entrance} alt='pic'/>
                    </div>
                    <div className={about.textcard}>
                        <p>From our humble beginnings as a small storefront, we've grown into a trusted name in the mobile retail industry, known for our exceptional customer service, extensive product range, and deep commitment to quality.
                        Sri Google Paradise is started with a vision to create a space where technology meets affordability, ensuring that every customer walks out with their ideal mobile device.
                        </p>
                    </div>
                </div>
            </div>
            <div className={about.card} data-aos="fade-left" data-aos-duration="1000">
                <h3 className='text-center'>Why Google Paradise?</h3>
                <div className={about.aboutcard}>
                    <div className={about.cards}>
                        <p>We pride ourselves on offering an extensive selection of mobile phones, accessories, and gadgets from leading brands. Whether you're an Android aficionado or an Apple enthusiast, we have something for everyone.</p>
                    </div>
                    <div className={about.cards}>
                        <p>Our knowledgeable staff are not just salespeople they're technology lovers who are here to answer your questions, help you navigate the latest trends, and find the perfect product to meet your needs and budget.</p>
                    </div>
                    <div className={about.cards}>
                        <p> We understand the importance of value for money. That's why we offer competitive pricing on all our products, along with exclusive deals and promotions to ensure you get the best bang for your buck.</p>
                    </div>
                    <div className={about.cards}>
                        <p>Your experience doesn't end at the point of sale. We offer comprehensive after-sales support, including device setup assistance, troubleshooting services, and warranty facilitation to ensure your satisfaction and peace of mind.</p>
                    </div>
                </div>
            </div>
            <div className={about.cont} >
                <div className={about.cons}data-aos="flip-left">
                    <h4>Our Showroom</h4>
                    <img src={show} alt='pic'/>
                </div>
                <div className={about.cons1} data-aos="flip-right">
                    <h4>Location</h4>
                    <h5>Sri Google Paradise</h5>
                    <div className="d-flex">
                    <ul>
                        <li>No:67, Sivan Complex,</li>
                        <li>Near Kamatchiamman Kovil,</li>
                        <li>West Pradhakshanam Road,</li>
                        <li>KARUR-639 003</li>
                    </ul>
                    <img src={qr} className={about.qr}/>
                    </div>
                    
                </div>
            </div>
    </Layout>
    );
}

export default About;
