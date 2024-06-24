import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import React from 'react';
import styles from '../stylesheets/Contact.module.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function Contact() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qns, setQns] = useState("");
  const [optional, setOptional] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post('/api/v1/contact/submission', {firstname, lastname, email, phone, qns, optional});
      if(data?.success){
        toast.success("Submitted Successfully");
      }
      navigate('/');
    }
    catch(error){
      console.log(error);
    }
  };

  return (
    <Layout>
        <div className={styles.header1}>
        <h1>Contact Us</h1>
        <p>We are happy to answer questions and you acquainted with us</p>
        <p>&#x2713; We'll guide you to choose your perfect Smart Phone</p>
        <p>&#x2713; Get idea about Smart Phones</p>
        <p>&#x2713; Explore your choices</p>
        <p id={styles["gap"]} >For any further queries, please call or email us.</p>
        </div>
        <div className={styles.formbox}>
        <form onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.disp}>
                <label htmlFor="firstname">First name</label>
                <input className={styles.inp1} type="text" id="firstname" name="firstname" placeholder="Your first name" onChange={(e)=>setFirstName(e.target.value)} />
              </div>
              <div className={styles.disp}>
                <label htmlFor="lastname">Last name</label>
                <input className={styles.inp1} type="text" id="lastname" name="lastname" placeholder="Your last name"  onChange={(e)=>setLastName(e.target.value)}/>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.disp}>
                <label htmlFor="email">Email</label>
                <input className={styles.inp1} type="email" id="email" name="email" placeholder="example@gmail.com" onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className={styles.disp}>
                <label htmlFor="phone">Phone No</label>
                <input type="text" className={styles.inp1} id="phone" name="phone" placeholder="Your Phone No"  onChange={(e)=>setPhone(e.target.value)}/>
              </div>
            </div>  
            <div className={styles.row1}>
              <div className={styles.disp}>
                <label htmlFor="qns">How can we help you?</label>
                <textarea name="qns" id="qns" cols="30" rows="5" placeholder="Your Question" onChange={(e)=>setQns(e.target.value)}></textarea>
              </div>
            </div>
            <div className={styles.row1}>
                <div className={styles.disp}>
                  <label htmlFor="optional">Anything else?</label>
                  <textarea name="optional" id="optional" cols="30" rows="5" placeholder="Your Experience with our site" onChange={(e)=>setOptional(e.target.value)}></textarea>
                </div>
            </div>
            <button className={styles.button}>Submit</button>
        </form>
        </div>
        <div className="d-flex flex-column">
          <div className={styles.card}> 
              <h4>Call Us</h4>
              <p>Phone no: 9092669922</p>
          </div>
          <div className={styles.card1}> 
              <h4>Email Us</h4>
              <p>srigoogleparadise@gmail.com</p>
          </div>
        </div>
    </Layout>
  );
}


